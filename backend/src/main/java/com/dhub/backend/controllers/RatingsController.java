package com.dhub.backend.controllers;

import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.ERole;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.RatingsRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.GoogleCloudStorageService;
import com.dhub.backend.services.RatingsService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/ratings")

@PreAuthorize("hasRole('DESIGNER')")
public class RatingsController {
    @Autowired
    private RatingsService ratingsService;

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RatingsRepository ratingsRepository;

    @Autowired
    private GoogleCloudStorageService googleCloudStorageService;

    /*
     * Create a review for a order
     */    
    @PostMapping
    public ResponseEntity<HttpStatus> createReview(@RequestParam("file") MultipartFile file,
    @RequestParam("data") String ratingsString) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        RatingsDTO ratingsDTO = objectMapper.readValue(ratingsString, RatingsDTO.class);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Long orderId = ratingsDTO.getOrder_id();
        Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new RuntimeException("Error: Pedido no encontrado."));
        // Comprobar que existe el pedido
        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (user.getId() != order.getUserEntity().getId()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String urlPhoto = "";
        try {
            urlPhoto = googleCloudStorageService.uploadRatingsPhoto(file);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        Ratings ratings = ratingsService.convertToEntity(ratingsDTO);
        ratings.setUrlPhoto(urlPhoto);
        ratings.setOrder(order);
        ratingsRepository.save(ratings);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /*
     * Update a review
     * TODO: check if the user is the owner of the order¿?¿?
     */    
    @PutMapping("/{id}")
    public ResponseEntity<Printer> uploadPhoto(@PathVariable Long id) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Ratings rating = ratingsRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Error: Reseña no encontrada."));

        if (user.getId() != rating.getOrder().getUserEntity().getId()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        ratingsRepository.save(rating);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Metodo DELETE: Elimina reseña
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRating(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Ratings rating = ratingsRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Reseña no encontrada."));
        
        if (user.getId() == rating.getOrder().getUserEntity().getId() || user.getRoles().contains(ERole.ROLE_ADMIN)) {
            ratingsRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


}


 
