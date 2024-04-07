package com.dhub.backend.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dhub.backend.models.Ratings;

import com.dhub.backend.repository.RatingsRepository;


@Service
public class RatingsServiceImpl implements RatingsService {
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

}

// public class RatingsServiceImpl implements RatingsService {
//     @Autowired
//     private RatingsRepository ratingsRepository;
//     @Override
//     public List<Ratings> getAllRatings() {
//         return ratingsRepository.findAll();
//     }
//     @Override
//     public Ratings getRatingsById(long id) {
//         return ratingsRepository.findById(id).orElse(null);
//     }
//     @Override
//     public Ratings addRatings(Ratings ratings) {
//         return ratingsRepository.save(ratings);
//     }
//     @Override
//     public Ratings updateRatings(long id, Ratings newRatings) {
//         Ratings existingRatings = ratingsRepository.findById(id).orElse(null);
//         if (existingRatings != null) {
//             existingRatings.setProductRatings(newRatings.getProductRatings());
//             existingRatings.setManufacturerRatings(newRatings.getManufacturerRatings());
//             return ratingsRepository.save(existingRatings);
//         }
//         return null;
//     }
//     @Override
//     public void deleteRatings(long id) {
//         ratingsRepository.deleteById(id);
//     }
//     @Override
//     public List<Ratings> getManufacturerRatings(String manufacturerId) {
//         return ratingsRepository.findByManufacturerId(manufacturerId);
//     }
//     @Override
//     public void setManufacturerId(Long manufacturerId) {
//         this.manufacturer.setId(manufacturerId);
//     }
//     @Override
//     public Ratings updateManufacturerRatings(long ratingsId, Ratings newRatings) {
//         Ratings existingRatings = ratingsRepository.findById(ratingsId).orElse(null);
//         if (existingRatings != null) {
//             existingRatings.setProductRatings(newRatings.getProductRating());
//             existingRatings.setManufacturerRatings(newRatings.getManufacturerRatings());
//             return ratingsRepository.save(existingRatings);
//         }
//         return null;
        
    
//     }
    
//     @Override
//     public void deleteManufacturerRatings(long ratingsId) {
//         ratingsRepository.deleteById(ratingsId);
//     }
    
// }


