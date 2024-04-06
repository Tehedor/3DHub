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

import com.dhub.backend.controllers.request.CreateDesignerDTO;
import com.dhub.backend.controllers.request.CreateManufacturerDTO;
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

    // @PostMapping("/loginDesigner")
    // public ResponseEntity<?> autheticateUser(@Valid @RequestBody LoginUserDTO loginRequest) {
        
    //     Authentication authentication = authenticationManager
    //         .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    //     SecurityContextHolder.getContext().setAuthentication(authentication);

    //     UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    //     String jwt = jwtUtils.generateAccessToken(userDetails.getUsername());
        
    //     List<String> roles = userDetails.getAuthorities().stream()
    //     .map(item -> item.getAuthority())
    //     .collect(Collectors.toList());


    //     return ResponseEntity.ok().header("Usuario Encontrado",jwt.toString())
    //         .body(new UserInfoResponse(userDetails.getId(),
    //                                userDetails.getUsername(),
    //                                userDetails.getEmail(),
    //                               roles));

    // }
    


    @PostMapping("/createUser")
    public ResponseEntity<?> CreateUSer(@Valid @RequestBody CreateUserDTO createUserDTO) {

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
            .roles(roles)
            .build();


        userRepository.save(userEntity);
        return ResponseEntity.ok(new MessageResponse("Usuario creado exitosamente"));

    }

    @PostMapping("/createDesigner")
    public ResponseEntity<?> CreateDesigner(@Valid @RequestBody CreateDesignerDTO createDesignerDTO) {

        if (userRepository.existsByUsername(createDesignerDTO.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Nombre de usuario ya existe"));
          }
      
        if (userRepository.existsByEmail(createDesignerDTO.getEmail())) {
        return ResponseEntity.badRequest().body(new MessageResponse("Error: Email ya existe"));
        }
       
        Set<Role> roles = createDesignerDTO.getRoles().stream()
            .map(role -> Role.builder()
                .name(ERole.valueOf(role))
                .build())
            .collect(Collectors.toSet());   

        UserEntity userEntity = UserEntity.builder()
            .dni(createDesignerDTO.getDni())
            .username(createDesignerDTO.getUsername())
            .password(passwordEncoder.encode(createDesignerDTO.getPassword()))
            .email(createDesignerDTO.getEmail())
            .roles(roles)
            .lat(createDesignerDTO.getLat())
            .lon(createDesignerDTO.getLon())
            .address(createDesignerDTO.getAddress())
            .factAddress(createDesignerDTO.getFactAddress())
            .build();


        userRepository.save(userEntity);
        return ResponseEntity.ok(new MessageResponse("Diseñador creado exitosamente"));

    }


    @PostMapping("/createManufacturer")
    public ResponseEntity<?> CreateManufacturer(@Valid @RequestBody CreateManufacturerDTO createManufacturerDTO) {

        if (userRepository.existsByUsername(createManufacturerDTO.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Nombre de usuario ya existe"));
          }
      
        if (userRepository.existsByEmail(createManufacturerDTO.getEmail())) {
        return ResponseEntity.badRequest().body(new MessageResponse("Error: Email ya existe"));
        }
       
        Set<Role> roles = createManufacturerDTO.getRoles().stream()
            .map(role -> Role.builder()
                .name(ERole.valueOf(role))
                .build())
            .collect(Collectors.toSet());   

        UserEntity userEntity = UserEntity.builder()
            .dni(createManufacturerDTO.getDni())
            .username(createManufacturerDTO.getUsername())
            .password(passwordEncoder.encode(createManufacturerDTO.getPassword()))
            .email(createManufacturerDTO.getEmail())
            .roles(roles)
            .address(createManufacturerDTO.getAddress())
            .build();


        userRepository.save(userEntity);
        return ResponseEntity.ok(new MessageResponse("Fabricante creado exitosamente"));

    }



    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String id){
        userRepository.deleteById(Long.parseLong(id));
        return "Se ha eliminado el usuario con id: ".concat(id);
    }


}
