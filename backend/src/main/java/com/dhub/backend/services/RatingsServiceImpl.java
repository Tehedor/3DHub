package com.dhub.backend.services;

import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.RatingsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class RatingsServiceImpl implements RatingsService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private RatingsRepository ratingsRepository;
    
    @Autowired
    private OrderService orderService;
    
    @Override
    public RatingsDTO convertToDTO(Ratings ratings) {
        RatingsDTO ratingsDTO = new RatingsDTO();

        ratingsDTO.setId(ratings.getId());
        ratingsDTO.setDate(ratings.getDate());
        ratingsDTO.setManufacturerRating(ratings.getManufacturerRating());
        ratingsDTO.setProductRating(ratings.getProductRating());
        ratingsDTO.setTextRating(ratings.getTextRating());
        ratingsDTO.setOrder_id(ratings.getOrder().getId());
        ratingsDTO.setPrinter_id(ratings.getOrder().getPrinter().getId());

        return ratingsDTO;
    }

    @Override
    public Ratings convertToEntity(RatingsDTO ratingsDTO) {
        Ratings ratings = new Ratings();

        // ratings.setId(ratingsDTO.getId());
        ratings.setDate(ratingsDTO.getDate());
        ratings.setManufacturerRating(ratingsDTO.getManufacturerRating());
        ratings.setProductRating(ratingsDTO.getProductRating());
        ratings.setTextRating(ratingsDTO.getTextRating());
        ratings.setOrder(orderRepository.findById(ratingsDTO.getOrder_id()).get());

        return ratings;
    }

    @Override
    public List<RatingsDTO> getRatingsByPrinterIds(List<Long> printerIds) {

        List<Long> orderIds = new ArrayList<>();
        for (Long printerId : printerIds) {
            List<Long> printerOrderIds = orderService.findOrderIdsByPrinterId(printerId);
            orderIds.addAll(printerOrderIds);
        }
        List<RatingsDTO> ratingsDTOs = new ArrayList<>();
        for (Long orderId : orderIds) {
            Ratings rating = ratingsRepository.findByOrderId(orderId);
            if (rating != null) {
                RatingsDTO ratingDTOs = convertToDTO(rating);
                ratingsDTOs.add(ratingDTOs);
            }
        }

        return ratingsDTOs;
    }

    @Override
    public List<RatingsDTO> getRatingsByOrderIds(List<Long> orderIds) {
        List<RatingsDTO> ratingsDTOs = new ArrayList<>();
        for (Long orderId : orderIds) {
            Ratings rating = ratingsRepository.findByOrderId(orderId);
            if (rating != null) {
                RatingsDTO ratingDTOs = convertToDTO(rating);
                ratingsDTOs.add(ratingDTOs);
            }
        }

        return ratingsDTOs;
    }

    public static String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return ""; // No hay extensión
        }
    }

    @Override
    public Ratings createRatingWithFile(MultipartFile file, String textRating, int productRating, int manufacturerRating, Long order_id) throws IOException {
        Ratings rating = new Ratings();
        rating.setDate(new Date(System.currentTimeMillis()));
        rating.setProductRating(productRating);
        rating.setManufacturerRating(manufacturerRating);
        rating.setTextRating(textRating);
        rating.setFile(file.getBytes());
        rating.setFileFormat(getFileExtension(file.getOriginalFilename()));
        rating.setOrder(orderRepository.findById(order_id).orElse(null));
    
        return rating;

    }
}
