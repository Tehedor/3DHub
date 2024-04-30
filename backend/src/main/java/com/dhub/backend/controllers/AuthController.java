package com.dhub.backend.controllers;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

import com.dhub.backend.controllers.request.CreateUserDTO;
import com.dhub.backend.controllers.response.MessageResponse;
import com.dhub.backend.models.*;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.security.jwt.JwtUtils;
import com.dhub.backend.util.FileUploadUtil;

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

    //Subir foto de perfil y actualizar usuario
    @PutMapping("/uploadPhoto/{id}")
    public ResponseEntity<Printer> uploadPhoto(@Valid @RequestPart("file") MultipartFile file,@PathVariable Long id) throws IOException {
        UserEntity user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        if (file != null) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uploadDir = "profilePhotos\\";
        FileUploadUtil.saveFile(uploadDir, fileName, file);
        user.setProfileImage(uploadDir + fileName);
        userRepository.save(user);
    }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //Eliminar usuario
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String id){
        userRepository.deleteById(Long.parseLong(id));
        return "Se ha eliminado el usuario con id: ".concat(id);
    }


}
