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
public class CreateUserDTO {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String username;
    
    @NotBlank
    private String password;
    private Set<String> roles;
    
}
