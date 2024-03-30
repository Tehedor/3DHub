package com.dhub.backend.services;

import com.dhub.backend.models.Printer;
import com.dhub.backend.repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrinterService {

    @Autowired
    private PrinterRepository printerRepository;

    public Printer createPrinter(Printer printer) {
        return printerRepository.save(printer);
    }
}