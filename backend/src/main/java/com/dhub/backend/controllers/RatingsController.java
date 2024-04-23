package com.dhub.backend.controllers;
import java.util.List;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.OrderService;
import com.dhub.backend.services.RatingsService;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@RestController
@RequestMapping("/ratings")



public class RatingsController {
    @Autowired
    private RatingsService ratingsService;

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepository userRepository;


// Metodo POST: Crear reseña basada en un pedido existente

@PostMapping("/createReview")
public ResponseEntity<Ratings> createReview(@RequestBody Ratings ratings, @RequestParam Long orderId) {
    Order order = orderService.getOrderById(orderId);
    // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    // String username = (authentication != null) ? authentication.getName() : null;
    // UserEntity user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
   
    ratings.setOrder(order);
   
    Ratings newRating = ratingsService.addRatings(ratings);
    return new ResponseEntity<>(newRating, HttpStatus.CREATED);
}
    
}


 
