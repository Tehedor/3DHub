package com.dhub.backend.services;

import java.util.List;

import com.dhub.backend.models.Ratings;

public interface RatingsService {
    
    List<Ratings> getPrinterRatings(Long printerId);
    
    // Ratings getRatingsById(long id);
    
    // Ratings addRatings(Ratings ratings);
    
    // Ratings updateRatings(long id, Ratings newRatings);
    
    // void deleteRatings(long id);
    
    // List<Ratings> getManufacturerRatings(String manufacturerId);
    
    // Ratings addManufacturerRatings(String manufacturerId, Ratings ratings);
    
    // Ratings updateManufacturerRatings(long ratingsId, Ratings newRating);
    
    // void deleteManufacturerRatings(long ratingsId);
}