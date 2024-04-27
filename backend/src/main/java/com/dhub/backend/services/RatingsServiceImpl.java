package com.dhub.backend.services;

import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.repository.RatingsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RatingsServiceImpl implements RatingsService {


    @Autowired
    private OrderService orderService;

    @Autowired
    private RatingsRepository ratingsRepository;

    @Override
    public RatingsDTO convertToDto(Ratings ratings) {
    RatingsDTO ratingsDTO = new RatingsDTO();
    
    ratingsDTO.setId(ratings.getId());
    ratingsDTO.setDate(ratings.getDate());
    ratingsDTO.setManufacturerRating(ratings.getManufacturerRating());
    ratingsDTO.setProductRating(ratings.getProductRating());
    ratingsDTO.setFile(ratings.getFile());
    ratingsDTO.setTextRating(ratings.getTextRating());
    ratingsDTO.setOrder_id(ratings.getOrder().getId());

    return ratingsDTO;
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
                RatingsDTO ratingDTOs = convertToDto(rating);
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
                RatingsDTO ratingDTOs = convertToDto(rating);
                ratingsDTOs.add(ratingDTOs);
            }
        }

        return ratingsDTOs;
    }
}
