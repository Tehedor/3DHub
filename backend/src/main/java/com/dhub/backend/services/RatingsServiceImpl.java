package com.dhub.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.RatingsRepository;

import org.springframework.stereotype.Service;

@Service
public class RatingsServiceImpl implements RatingsService {
    // @Autowired
    // private RatingsRepository ratingsRepository;

    // @Autowired
    private PrinterRepository printerRepository;

    @Override
    public List<Ratings> getPrinterRatings(Long printerId) {
        Printer printer = printerRepository.findById(printerId).orElse(null);

        return printer.getRatings();
    }
    // @Override
    // public Ratings getRatingsById(long id) {
    //     return ratingsRepository.findById(id).orElse(null);
    // }
    // @Override
    // public Ratings addRatings(Ratings ratings) {
    //     return ratingsRepository.save(ratings);
    // }
    // @Override
    // public Ratings updateRatings(long id, Ratings newRatings) {
    //     Ratings existingRatings = ratingsRepository.findById(id).orElse(null);
    //     if (existingRatings != null) {
    //         existingRating.setProductRatings(newRating.getProductRatings());
    //         existingRating.setManufacturerRatings(newRating.getManufacturerRatings());
    //         return ratingsRepository.save(existingRatings);
    //     }
    //     return null;
    // }
    // @Override
    // public void deleteRatings(long id) {
    //     ratingsRepository.deleteById(id);
    // }
    // @Override
    // public List<Ratings> getManufacturerRatings(String manufacturerId) {
    //     return ratingsRepository.findByManufacturerId(manufacturerId);
    // }
    // @Override
    // public Ratings addManufacturerRatings(String manufacturerId, Ratings ratings) {
    //     ratings.setIdManufacturer(manufacturerId);
    //     return ratingsRepository.save(ratings);
    // }
    // @Override
    // public Ratings updateManufacturerRatings(long ratingsId, Ratings newRatings) {
    //     Ratings existingRatings = ratingsRepository.findById(ratingsId).orElse(null);
    //     if (existingRatings != null) {
    //         existingRatings.setProductRatings(newRatings.getProductRatings());
    //         existingRatings.setManufacturerRatings(newRatings.getManufacturerRatings());
    //         return ratingsRepository.save(existingRatings);
    //     }
    //     return null;
        
    
    // }
    
    // @Override
    // public void deleteManufacturerRatings(long ratingsId) {
    //     ratingsRepository.deleteById(ratingsId);
    // }
}


