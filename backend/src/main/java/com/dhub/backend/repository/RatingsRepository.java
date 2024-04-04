package com.dhub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dhub.backend.models.Ratings;
@Repository
public interface RatingsRepository extends JpaRepository<Ratings, Long>{
    
}