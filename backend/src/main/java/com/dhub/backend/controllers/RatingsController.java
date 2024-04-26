package com.dhub.backend.controllers;


import java.io.IOException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.RatingsRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.OrderService;
import com.dhub.backend.services.RatingsService;
import com.dhub.backend.util.FileUploadUtil;

import jakarta.validation.Valid;

import com.dhub.backend.models.Role; 




@RestController
@RequestMapping("/ratings")



public class RatingsController {


    @Autowired
    private RatingsService ratingsService;

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RatingsRepository ratingsRepository;

// Metodo POST: Crear reseña basada en un pedido existente
@PostMapping("/{orderId}/createReview")
public ResponseEntity<RatingsDTO> createReview(@RequestBody Ratings ratings, @PathVariable Long orderId) {

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


    
    ratings.setOrder(order);
    Ratings newRating = ratingsService.addRatings(ratings);
    RatingsDTO ratingsDTO = ratingsService.convertToDto(ratings);
    return new ResponseEntity<>(ratingsDTO, HttpStatus.CREATED);
  
}

    @PutMapping("/uploadPhoto/{id}")
    public ResponseEntity<Printer> uploadPhoto(@Valid @RequestPart("file") MultipartFile file,@PathVariable Long id) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Ratings rating = ratingsRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Reseña no encontrada."));

        if (file != null) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uploadDir = "ratingsPhotos\\";
        FileUploadUtil.saveFile(uploadDir, fileName, file);
        rating.setFile(uploadDir + fileName);
        ratingsRepository.save(rating);
    }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}


 
