package com.dhub.backend.controllers;

import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import com.dhub.backend.models.UserEntity;
import com.dhub.backend.models.EColor;
import com.dhub.backend.models.EMaterial;
import com.dhub.backend.models.EPrinterType;
import com.dhub.backend.models.Printer;
import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.controllers.request.UserDTO;
import com.dhub.backend.services.GoogleCloudStorageService;
import com.dhub.backend.services.PrinterServiceImpl;
import com.dhub.backend.services.RatingsService;
import com.dhub.backend.services.UserEntityService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

import jakarta.validation.Valid;


@Data
@RestController
@RequestMapping("/api/printers")
public class PrinterController {

    @Autowired
    private PrinterServiceImpl printerService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserEntityService userService;

    @Autowired
    private PrinterRepository printerRepository;

    @Autowired
    private RatingsService ratingsService;

    @Autowired
    private GoogleCloudStorageService googleCloudStorageService;


    @GetMapping
    public ResponseEntity<Map<String, Object>> getPrinters() {

        List<Printer> printers = printerRepository.findAll();
        if(printers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<UserDTO> usersDTO = new ArrayList<>();
        for (Printer printer : printers) {
            usersDTO.add(userService.convertToDTO(printer.getUserEntity()));
        }

        List<PrinterDTO> printersDTO = new ArrayList<>();
        for (Printer printer : printers) {
            printersDTO.add(printerService.convertToDTO(printer));
        }
        List<Long> printerIds = printers.stream()
        .map(Printer::getId)
        .collect(Collectors.toList());

        List<RatingsDTO> ratingsDTO = ratingsService.getRatingsByPrinterIds(printerIds);

        Map<String, Object> response = new HashMap<>();
        response.put("printers", printersDTO);
        response.put("ratings", ratingsDTO);
        response.put("users", usersDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //Obtener todas las impresoras de fabricante ¿?¿?¿?
    @GetMapping("/manufacturer")
    public ResponseEntity<List<PrinterDTO>> getManufacturerPrinters() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<Printer> printers = printerRepository.findAll();
        if(printers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<PrinterDTO> printersDTO = new ArrayList<>();
        for (Printer printer : printers) {
            printersDTO.add(printerService.convertToDTO(printer));
        }
        return new ResponseEntity<>(printersDTO, HttpStatus.OK);
    }

    //Obtener todas las impresoras con sus respectivas valoraciones de un fabricante
    @PreAuthorize("hasRole('MANUFACTURER')")
    @GetMapping("/ratings")
    public ResponseEntity<Map<String, Object>> getManufacturerRatingsPrinters() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<Printer> printers = user.getPrinters();
        List<PrinterDTO> printersDTO = new ArrayList<>();
        for (Printer printer : printers) {
            printersDTO.add(printerService.convertToDTO(printer));
        }

        List<Long> printerIds = printers.stream()
        .map(Printer::getId)
        .collect(Collectors.toList());

        List<RatingsDTO> ratingsDTO = ratingsService.getRatingsByPrinterIds(printerIds);

        Map<String, Object> response = new HashMap<>();
        response.put("printers", printersDTO);
        response.put("ratings", ratingsDTO);

        if(response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //Crear impresora
    @PreAuthorize("hasRole('MANUFACTURER')")
    @PostMapping
    public ResponseEntity<Printer> createPrinter(@RequestParam("file") MultipartFile file,
    @RequestParam("data") String printerString) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        PrinterDTO printerDTO = objectMapper.readValue(printerString, PrinterDTO.class);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        printerDTO.setIdFabricante(user.getId());
        String urlPhoto = "";
        if (file != null) {
            try {
                urlPhoto = googleCloudStorageService.uploadPrinerPhoto(file);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        Printer createdPrinter = printerService.convertToEntity(printerDTO);
        createdPrinter.setUrlPhoto(urlPhoto);
        createdPrinter.setUserEntity(user);
        printerRepository.save(createdPrinter);
        // user.getPrinters().add(createdPrinter);
        // userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /*
     * Uploads the printer photo and saves the path in the database
     * TODO: Add a check to see if the user is the owner of the printer
     */
    @PreAuthorize("hasRole('MANUFACTURER')")
    @PutMapping("/{id}")
    public ResponseEntity<Printer> editPrinter(@PathVariable Long id) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Printer printer = printerRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Impresora no encontrada."));

        if (user.getId() != printer.getUserEntity().getId()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        printerRepository.save(printer);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //Eliminar impresora
    @PreAuthorize("hasRole('MANUFACTURER')")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Printer printer = printerRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Impresora no encontrada."));

        if (user.getId() == printer.getUserEntity().getId()) {
            printerRepository.deleteById(id);
        }
        
    }
}