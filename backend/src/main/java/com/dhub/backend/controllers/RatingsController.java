package com.dhub.backend.controllers;


import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.services.OrderService;
import com.dhub.backend.services.RatingsService;
import com.dhub.backend.models.Role; 




@RestController
@RequestMapping("/ratings")



public class RatingsController {


    @Autowired
    private RatingsService ratingsService;

    @Autowired
    private OrderService orderService;
    


// Metodo POST: Crear reseña basada en un pedido existente
@PostMapping("/{id}/createReview")
public ResponseEntity<Ratings> createReview(@RequestBody Ratings ratings, @PathVariable Long id) {

    Order order = orderService.getOrderById(id);

//Comprobar que existe el pedido 
    if (order == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

// Usuario asociado a un pedido
    UserEntity user = order.getUserEntity();

    if (user == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    ratings.setOrder(order);
    Ratings newRating = ratingsService.addRatings(ratings);
    return new ResponseEntity<>(newRating, HttpStatus.CREATED);
}
}


 
