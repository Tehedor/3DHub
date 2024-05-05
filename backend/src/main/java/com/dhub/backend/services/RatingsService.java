package com.dhub.backend.services;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.Ratings;

public interface RatingsService {
        
    RatingsDTO convertToDTO(Ratings ratings);

    Ratings convertToEntity(RatingsDTO ratingsDTO);

    List<RatingsDTO> getRatingsByPrinterIds(List<Long> printerIds);

    List<RatingsDTO> getRatingsByOrderIds(List<Long> orderIds);

    // Ratings createRatingWithFile(MultipartFile file, RatingsDTO ratingsDTO) throws IOException;

}