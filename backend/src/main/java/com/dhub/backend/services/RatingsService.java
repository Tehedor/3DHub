package com.dhub.backend.services;

import java.util.List;

import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.Ratings;

public interface RatingsService {
    
    
    Ratings getRatingsById(long id);
    
    Ratings addRatings(Ratings ratings);
    
    Ratings updateRatings(long id, Ratings newRatings);
    
    void deleteRatings(long id);
    Ratings updateManufacturerRatings(long ratingsId, Ratings newRating);
    
    void deleteManufacturerRatings(long ratingsId);
    List<Ratings> getRatingsByPrinter(Long printerId);
    
    Double getAverageRatingByDesigners(Long printerId);
    
    Double getAverageRatingByManufacturer(Long printerId);

    RatingsDTO convertToDto(Ratings ratings);

}