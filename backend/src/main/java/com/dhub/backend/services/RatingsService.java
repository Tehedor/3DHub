package com.dhub.backend.services;

import java.util.List;

import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.Ratings;

public interface RatingsService {
        
    RatingsDTO convertToDTO(Ratings ratings);

    Ratings convertToEntity(RatingsDTO ratingsDTO);

    List<RatingsDTO> getRatingsByPrinterIds(List<Long> printerIds);

    List<RatingsDTO> getRatingsByOrderIds(List<Long> orderIds);

}