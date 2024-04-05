package com.dhub.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.Data;

import com.dhub.backend.models.Printer;
import com.dhub.backend.services.PrinterServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@Data
@RestController
@RequestMapping("/printers")
public class PrinterController {

    @Autowired
    private PrinterServiceImpl printerService;

    @PostMapping
    public ResponseEntity<Printer> createPrinter(@Valid @RequestBody Printer printer) {
        Printer createdPrinter = printerService.createPrinter(printer);
        return new ResponseEntity<>(createdPrinter, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<Printer>> getAllPrinters() {
        List<Printer> printers = printerService.getAllPrinters();
        if (printers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(printers, HttpStatus.OK);
    }
}