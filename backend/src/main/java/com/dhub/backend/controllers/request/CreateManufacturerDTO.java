package com.dhub.backend.controllers.request;

import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateManufacturerDTO {
    @NotBlank
    private String dni;

    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;
    
    @NotBlank
    private String password;

    // private byte[] profileImage;

    private String address;

    private Set<String> roles;
    
}