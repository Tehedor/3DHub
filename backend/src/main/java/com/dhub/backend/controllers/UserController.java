package com.dhub.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhub.backend.controllers.request.UserDTO;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.UserEntityService;

import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;

@Data
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserEntityService userEntityService;

    @GetMapping
    public ResponseEntity<UserDTO> getPrinters() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = (authentication != null) ? authentication.getName() : null;
    UserEntity user = userRepository.findByUsername(username)
    .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
    UserDTO userDTO = userEntityService.convertToDTO(user);

        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    
    
}
