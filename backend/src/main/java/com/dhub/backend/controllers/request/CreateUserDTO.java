package com.dhub.backend.controllers.request;

import java.util.Set;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDTO {

    @NotBlank
    private String dni;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String username;
    
    @NotBlank
    private String password;
    private Set<String> roles;
    
    @Lob
    private byte[] profileImage;

    private Double lat;

    private Double lon;

    private String address;

    private String factAddress;

    private String iban;

}
