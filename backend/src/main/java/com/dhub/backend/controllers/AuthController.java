package com.dhub.backend.controllers;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

import com.dhub.backend.controllers.request.CreateUserDTO;
import com.dhub.backend.controllers.response.MessageResponse;
import com.dhub.backend.models.*;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.security.jwt.JwtUtils;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
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

    //Crear usuario
    @PostMapping("/createUser")
    public ResponseEntity<?> CreateUSer(
        @RequestParam("file") MultipartFile file,
        @RequestParam("dni") String dni,
        @RequestParam("email") String email,
        @RequestParam("username") String username,
        @RequestParam("password") String password,
        @RequestParam("roles") Set<String> roles,
        @RequestParam("lat") Double lat,
        @RequestParam("lon") Double lon,
        @RequestParam("address") String address,
        @RequestParam("factAddress") String factAddress
    ) {

        if (userRepository.existsByDni(dni)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: DNI ya existe"));
          }

        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Nombre de usuario ya existe"));
          }
      
        if (userRepository.existsByEmail(email)) {
        return ResponseEntity.badRequest().body(new MessageResponse("Error: Email ya existe"));
        }
       
        Set<Role> setRoles = roles.stream()
            .map(role -> Role.builder()
                .name(ERole.valueOf(role))
                .build())
            .collect(Collectors.toSet());   

        UserEntity userEntity = UserEntity.builder()
            .dni(dni)
            .username(username)
            .password(passwordEncoder.encode(password))
            .email(email)
            .fileFormat(StringUtils.cleanPath(file.getOriginalFilename()))
            .lat(lat)
            .lon(lon)
            .address(address)
            .factAddress(factAddress)
            .roles(setRoles)
            .build();

        userRepository.save(userEntity);
        try {
            userEntity.setProfileImage(file.getBytes());
        } catch (IOException e) {
            // Handle the exception here
        }
        return ResponseEntity.ok(new MessageResponse("Usuario creado exitosamente"));

    }

    //Subir foto de perfil y actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<Printer> uploadPhoto(@PathVariable Long id) throws IOException {
        UserEntity user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //Eliminar usuario
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
        return "Se ha eliminado el usuario con id: "+ id;
    }


}
