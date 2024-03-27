package com.dhub.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class TestRolesController {
    
    @GetMapping("/accessAdmin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String accessAdmin() {
        return "Acceso de Administrador";
    }
    @GetMapping("/accessDesigner")
    @PreAuthorize("hasRole('ROLE_DESIGNER')")
    public String accessDesigner() {
        return "Acceso de Diseñador";
    }
    @GetMapping("/accessManufacturer")
    @PreAuthorize("hasRole('ROLE_MANUFACTURER')")
    public String accessManufacturer() {
        return "Acceso de Fabricante";
    }

}
