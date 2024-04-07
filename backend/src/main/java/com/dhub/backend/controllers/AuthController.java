package com.dhub.backend.controllers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import com.dhub.backend.controllers.request.CreateUserDTO;
import com.dhub.backend.controllers.request.LoginUserDTO;
import com.dhub.backend.controllers.response.MessageResponse;
import com.dhub.backend.controllers.response.UserInfoResponse;
import com.dhub.backend.models.*;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.security.jwt.JwtUtils;
import com.dhub.backend.services.UserDetailsImpl;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/auth") 
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/createUser")
    public ResponseEntity<?> CreateUSer(@Valid @RequestBody CreateUserDTO createUserDTO) {

        if (userRepository.existsByDni(createUserDTO.getDni())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: DNI ya existe"));
          }

        if (userRepository.existsByUsername(createUserDTO.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Nombre de usuario ya existe"));
          }
      
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
        return ResponseEntity.badRequest().body(new MessageResponse("Error: Email ya existe"));
        }
       
        Set<Role> roles = createUserDTO.getRoles().stream()
            .map(role -> Role.builder()
                .name(ERole.valueOf(role))
                .build())
            .collect(Collectors.toSet());   

        UserEntity userEntity = UserEntity.builder()
            .dni(createUserDTO.getDni())
            .username(createUserDTO.getUsername())
            .password(passwordEncoder.encode(createUserDTO.getPassword()))
            .email(createUserDTO.getEmail())
            .lat(createUserDTO.getLat())
            .lon(createUserDTO.getLon())
            .address(createUserDTO.getAddress())
            .factAddress(createUserDTO.getFactAddress())
            .roles(roles)
            .build();


        userRepository.save(userEntity);
        return ResponseEntity.ok(new MessageResponse("Usuario creado exitosamente"));

    }



    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String id){
        userRepository.deleteById(Long.parseLong(id));
        return "Se ha eliminado el usuario con id: ".concat(id);
    }


}
