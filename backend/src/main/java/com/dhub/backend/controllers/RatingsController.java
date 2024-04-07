
package com.dhub.backend.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhub.backend.models.Ratings;
import com.dhub.backend.services.RatingsService;

@RestController
@RequestMapping("/ratings")



public class RatingsController {
    @Autowired
    private RatingsService ratingsService;
    
// Metodo GET: Obtener todas las reseñas correspondientes a una impresora
@GetMapping("/printer/{printerId}")
public ResponseEntity<List<Ratings>> getRatingsByPrinter(@PathVariable Long printerId) {
    List<Ratings> ratings = ratingsService.getRatingsByPrinter(printerId);
    return new ResponseEntity<>(ratings, HttpStatus.OK);
}

// Metodo Post(/addRating): Crear reseña con todos sus atributos incluyendo diseñador e impresora a la que corresponden
@PostMapping("/addRating")
public ResponseEntity<Ratings> addRating(@RequestBody Ratings ratings) {
    Ratings newRating = ratingsService.addRatings(ratings);
    return new ResponseEntity<>(newRating, HttpStatus.CREATED);
}

// Metodo Get: Obtener una media de las reseñas de una impresora por parte de los diseñadores
@GetMapping("/average/printer/{printerId}/designers")
public ResponseEntity<Double> getAverageRatingByDesigners(@PathVariable Long printerId) {
    Double averageRating = ratingsService.getAverageRatingByDesigners(printerId);
    return new ResponseEntity<>(averageRating, HttpStatus.OK);
}

// Método GET con media de las reseñas de una impresora por parte del fabricante
@GetMapping("/average/printer/{printerId}/manufacturer")
public ResponseEntity<Double> getAverageRatingByManufacturer(@PathVariable Long printerId) {
    Double averageRating = ratingsService.getAverageRatingByManufacturer(printerId);
    return new ResponseEntity<>(averageRating, HttpStatus.OK);
}
}
 
    // @GetMapping("/{id}")
    // public ResponseEntity<Ratings> getRatingsById(@PathVariable("id") long id) {
    //     Ratings ratings = ratingsService.getRatingsById(id);
    //     if (ratings != null) {
    //         return new ResponseEntity<>(ratings, HttpStatus.OK);
    //     } else {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    // }

    // @PostMapping
    // public ResponseEntity<Ratings> addRating(@RequestBody Ratings ratings) {
    //     Ratings addedRatings = ratingsService.addRatings(ratings);
    //     return new ResponseEntity<>(addedRatings, HttpStatus.CREATED);
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<Ratings> updateRatings(@PathVariable("id") long id, @RequestBody Ratings newRatings) {
    //     Ratings updatedRatings = ratingsService.updateRatings(id, newRatings);
    //     if (updatedRatings != null) {
    //         return new ResponseEntity<>(updatedRatings, HttpStatus.OK);
    //     } else {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteRatings(@PathVariable("id") long id) {
    //     ratingsService.deleteRatings(id);
    //     return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    // }
    

