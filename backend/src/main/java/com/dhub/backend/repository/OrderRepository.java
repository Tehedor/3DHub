package com.dhub.backend.repository;

import com.dhub.backend.models.Order;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {
        
        Optional<Order> findById(Long id);
        List<Order> findAll();
        void deleteById(Long id);
}
