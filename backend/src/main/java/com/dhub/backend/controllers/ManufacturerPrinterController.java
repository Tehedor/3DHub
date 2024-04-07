package com.dhub.backend.controllers;

import com.dhub.backend.controllers.request.PrinterDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.Data;

import com.dhub.backend.models.Printer;
import com.dhub.backend.services.PrinterServiceImpl;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@Data
@RestController
@RequestMapping("/api/manufacturerPrinters")
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANUFACTURER')")

public class ManufacturerPrinterController {

    @Autowired
    private PrinterServiceImpl printerService;

    @Autowired
    private UserRepository userRepository;

    // @PostMapping("/{userId}")
    // public ResponseEntity<Printer> createPrinter(@Valid @PathVariable Long userId, @RequestBody Printer printer) {
    //     UserEntity user = userRepository.findById(userId)
    //             .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
    //     Printer createdPrinter = printerService.createPrinter(printer);
    //     createdPrinter.setUserEntity(user);
    //     user.getPrinters().add(createdPrinter);
    //     userRepository.save(user);

    //     return new ResponseEntity<>(HttpStatus.CREATED);
    // }

    //Falta filtrar por manufacturer
    @GetMapping("/{userId}")
    public ResponseEntity<List<PrinterDTO>> getAllPrinters(@PathVariable Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        List<PrinterDTO> printers = user.getPrintersWithoutUserEntity();
        if (printers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(printers, HttpStatus.OK);
    }


    @GetMapping("/username")
    public String getUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        return username;
    }
}