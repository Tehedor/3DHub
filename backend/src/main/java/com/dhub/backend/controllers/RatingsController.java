
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

import lombok.Data;

@RestController
@RequestMapping("/api/ratings")
public class RatingsController {
    @Autowired
    private RatingsService ratingsService;

    @GetMapping("/{id}")
    public ResponseEntity<List<Ratings>> getPrinterRatings(@PathVariable Long printerId){
        List<Ratings> ratings = ratingsService.getPrinterRatings(printerId);
        return new ResponseEntity<>(ratings, HttpStatus.OK);
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
    
}
