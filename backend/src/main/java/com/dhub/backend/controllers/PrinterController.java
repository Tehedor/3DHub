package com.dhub.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import jakarta.validation.Valid;
import lombok.Data;

import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.models.Printer;
import com.dhub.backend.services.PrinterServiceImpl;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
//import org.springframework.web.bind.annotation.PathVariable;
import com.dhub.backend.models.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.UserRepository;

@Data
@RestController
@RequestMapping("/api/printers")
// @PreAuthorize("hasRole('ROLE_ADMIN')or hasRole('ROLE_DESIGNER')")

public class PrinterController {

    @Autowired
    private PrinterServiceImpl printerService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PrinterRepository printerRepository;

    @GetMapping
    public ResponseEntity<List<PrinterDTO>> getAllPrinters() {
        List<PrinterDTO> printers = printerService.getAllPrintersWithoutUser();
        if (printers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(printers, HttpStatus.OK);
    }

    @GetMapping("/printers")
    public ResponseEntity<List<PrinterDTO>> getManufacturerPrinters() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<PrinterDTO> printers = user.getPrintersWithoutUserEntity();
        if(printers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(printers, HttpStatus.OK);
    }

    @PostMapping("/createPrinter")
    public ResponseEntity<Printer> createPrinter(@Valid @RequestBody Printer printer) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Printer createdPrinter = printerService.createPrinter(printer);
        createdPrinter.setUserEntity(user);
        user.getPrinters().add(createdPrinter);
        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        printerService.deletePrinterById(id);
    }

                
                /*@GetMapping("/manufacturer/{manufacturerUsername}")
                public ResponseEntity<List<Printer>> getPrintersByManufacturer(@PathVariable Long manufacturerUsername) {
                    List<Printer> printers = printerService.getPrintersByManufacturer(manufacturerUsername);
                    if (printers.isEmpty()) {
                        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                    }
                    return new ResponseEntity<>(printers, HttpStatus.OK);
                }*/


                
    
    }
    