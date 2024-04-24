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
    public Ratings getRatingsById(long id) {
        return ratingsRepository.findById(id).orElse(null);
    }

    @Override
    public Ratings addRatings(Ratings ratings) {
        return ratingsRepository.save(ratings);
    }

    @Override
    public Ratings updateRatings(long id, Ratings newRatings) {
        Ratings existingRatings = ratingsRepository.findById(id).orElse(null);
        if (existingRatings != null) {
            existingRatings.setProductRating(newRatings.getProductRating());
            existingRatings.setManufacturerRating(newRatings.getManufacturerRating());
            return ratingsRepository.save(existingRatings);
        }
        return null;
    }

    @Override
    public void deleteRatings(long id) {
        ratingsRepository.deleteById(id);
    }

    @Override
    public Ratings updateManufacturerRatings(long ratingsId, Ratings newRatings) {
        Ratings existingRatings = ratingsRepository.findById(ratingsId).orElse(null);
        if (existingRatings != null) {
            existingRatings.setProductRating(newRatings.getProductRating());
            existingRatings.setManufacturerRating(newRatings.getManufacturerRating());
            return ratingsRepository.save(existingRatings);
        }
        return null;
    }

    @Override
    public void deleteManufacturerRatings(long ratingsId) {
        ratingsRepository.deleteById(ratingsId);
    }

    @Override
    public List<Ratings> getRatingsByPrinter(Long printerId) {
        // Implementa la lógica para obtener todas las reseñas de una impresora
        // Esto dependerá de cómo estén estructurados tus datos
        return null;
    }

    @Override
    public Double getAverageRatingByDesigners(Long printerId) {
        // Implementa la lógica para obtener la calificación promedio de los diseñadores para una impresora
        // Esto dependerá de cómo estén estructurados tus datos
        return null;
    }

    @Override
    public Double getAverageRatingByManufacturer(Long printerId) {
        // Implementa la lógica para obtener la calificación promedio del fabricante para una impresora
        // Esto dependerá de cómo estén estructurados tus datos
        return null;
    }

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
}
