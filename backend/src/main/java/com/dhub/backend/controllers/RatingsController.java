package com.dhub.backend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.ERole;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.RatingsRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.RatingsService;
import com.dhub.backend.util.FileUploadUtil;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/ratings")



public class RatingsController {
    @Autowired
    private RatingsService ratingsService;

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RatingsRepository ratingsRepository;

    /*
     * Create a review for a order
     */    
    @PostMapping("/{orderId}/createReview")
    public ResponseEntity<RatingsDTO> createReview(@RequestBody Ratings ratings, @PathVariable Long orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new RuntimeException("Error: Pedido no encontrado."));
        // Comprobar que existe el pedido
        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (user.getId() != order.getUserEntity().getId()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        ratings.setOrder(order);
        ratingsRepository.save(ratings);
        RatingsDTO ratingsDTO = ratingsService.convertToDTO(ratings);
        return new ResponseEntity<>(ratingsDTO, HttpStatus.CREATED);

    }

    /*
     * Upload photo and save it in the database
     * TODO: check if the user is the owner of the order¿?¿?
     */    
    @PutMapping("/uploadPhoto/{id}")
    public ResponseEntity<Printer> uploadPhoto(@Valid @RequestPart("file") MultipartFile file,@PathVariable Long id) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Ratings rating = ratingsRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Error: Reseña no encontrada."));

        // if (user.getId() != rating.getOrder().getUserEntity().getId()) {
        //     return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        // }

        if (file != null) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uploadDir = "ratingsPhotos\\";
        FileUploadUtil.saveFile(uploadDir, fileName, file);
        rating.setFile(uploadDir + fileName);
        ratingsRepository.save(rating);
    }

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


 
