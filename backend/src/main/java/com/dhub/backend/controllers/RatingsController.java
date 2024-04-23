package com.dhub.backend.controllers;


import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dhub.backend.models.ERole;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.RatingsRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.OrderService;
import com.dhub.backend.services.RatingsService;
import com.dhub.backend.models.Role; 




@RestController
@RequestMapping("/ratings")



public class RatingsController {


    @Autowired
    private RatingsRepository ratingsRepository;

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
    
//Comprobar que existe el pedido 
    if (order == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

// Usuario asociado a un pedido
    UserEntity user = order.getUserEntity();

    if (user == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    Set <Role> roles = user.getRoles();
    ratings.setOrder(order);
    Ratings newRating = ratingsService.addRatings(ratings);
    return new ResponseEntity<>(newRating, HttpStatus.CREATED);
}
}


 
