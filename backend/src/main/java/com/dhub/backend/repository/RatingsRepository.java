package com.dhub.backend.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhub.backend.models.Ratings;

@Repository
public interface RatingsRepository extends CrudRepository<Ratings, Long>{
    
    Ratings findByOrderId(Long orderId);

}
