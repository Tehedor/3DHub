package com.dhub.backend.services;

import com.dhub.backend.models.Printer;
import com.dhub.backend.repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PrinterServiceImpl implements PrinterService{

    @Autowired
    private PrinterRepository printerRepository;

    @Override
    public Printer createPrinter(Printer printer) {
        return printerRepository.save(printer);
    }

    @Override
    public List<Printer> getAllPrinters() {
        return StreamSupport.stream(printerRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }
    
}