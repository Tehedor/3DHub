package com.dhub.backend.services;

import com.dhub.backend.controllers.request.PrinterDTO;
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

    @Override
    public List<PrinterDTO> getAllPrintersWithoutUser() {
        return StreamSupport.stream(printerRepository.findAll().spliterator(), false)
                .map(printer -> new PrinterDTO(printer.getId(), printer.getModelName(), printer.getPrinterLocation(), printer.getPrinterType(), printer.getPrinterPhoto(), printer.getServicePrice(), 
                printer.getMaxUnities(), printer.getManufacturationSpeed(), printer.getMaxWidth(), printer.getMaxHeight(), printer.getPrinterPrecision(), printer.getColor(), printer.getMaterial()))
                .collect(Collectors.toList());
    }
    
}