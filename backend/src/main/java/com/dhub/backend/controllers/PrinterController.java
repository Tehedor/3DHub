package com.dhub.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

//import jakarta.validation.Valid;
import lombok.Data;

import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.Printer;
import com.dhub.backend.services.PrinterServiceImpl;
import com.dhub.backend.services.RatingsService;
import com.dhub.backend.util.FileUploadUtil;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
//import org.springframework.web.bind.annotation.PathVariable;
import com.dhub.backend.models.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.UserRepository;

import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.io.IOException;
import java.util.ArrayList;
import com.dhub.backend.controllers.request.UserDTO;
import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.models.Order;

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

    @Autowired
    private RatingsService ratingsService;

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

    @GetMapping("/ratings")
    public ResponseEntity<Map<String, Object>> getManufacturerRatingsPrinters() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<PrinterDTO> printers = user.getPrintersWithoutUserEntity();
        List<Long> printerIds = printers.stream()
        .map(PrinterDTO::getId)
        .collect(Collectors.toList());

        List<RatingsDTO> ratings = ratingsService.getRatingsByPrinterIds(printerIds);

        Map<String, Object> response = new HashMap<>();
        response.put("printers", printers);
        response.put("ratings", ratings);

        if(response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
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

    @PutMapping("/uploadPhoto/{id}")
    public ResponseEntity<Printer> uploadPhoto(@Valid @RequestPart("file") MultipartFile file,@PathVariable Long id) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Printer printer = printerRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Impresora no encontrada."));

        if (file != null) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uploadDir = "printerPhotos\\";
        FileUploadUtil.saveFile(uploadDir, fileName, file);
        printer.setPrinterPhoto((uploadDir + fileName));
        printerRepository.save(printer);
    }
        return new ResponseEntity<>(HttpStatus.OK);
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

    // En PrinterController.java
    /*@GetMapping("/manufacturer/{manufacturerId}")
    public ResponseEntity<Map<String, Object>> getManufacturerPrinters(@PathVariable Long manufacturerId) {
        List<Printer> printers = printerService.getPrintersByManufacturerId(manufacturerId);
    
        List<Long> printerIds = printers.stream()
            .map(Printer::getId)
            .distinct()
            .collect(Collectors.toList());
    
        List<PrinterDTO> printerDTOs = new ArrayList<>();
        for (Long printerId : printerIds) {
            PrinterDTO printer = printerService.getPrinterById(printerId);
            printerDTOs.add(printer);
        }
    
        Map<String, Object> response = new HashMap<>();
        response.put("printers", printerDTOs);
    
        if(response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }*/
}