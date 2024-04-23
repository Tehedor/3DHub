package com.dhub.backend.services;

import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.models.Printer;
import com.dhub.backend.repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import com.dhub.backend.models.UserEntity;
import java.util.ArrayList;

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
                printer.getMaxUnities(), printer.getManufacturationSpeed(), printer.getMaxWidth(), printer.getMaxHeight(), printer.getPrinterPrecision(), printer.getColor(), printer.getMaterial(), printer.getUserEntity().getUsername()))
                .collect(Collectors.toList());
    }

    @Override
    public PrinterDTO getPrinterById(Long id) {
        Printer printer = printerRepository.findById(id).orElse(null);
        PrinterDTO printerDTO = new PrinterDTO();
        // Copiar todos los atributos de printer a printerDTO
        printerDTO.setId(printer.getId());
        printerDTO.setModelName(printer.getModelName());
        printerDTO.setPrinterLocation(printer.getPrinterLocation());
        printerDTO.setPrinterType(printer.getPrinterType());
        printerDTO.setPrinterPhoto(printer.getPrinterPhoto());
        printerDTO.setServicePrice(printer.getServicePrice());
        printerDTO.setMaxUnities(printer.getMaxUnities());
        printerDTO.setManufacturationSpeed(printer.getManufacturationSpeed());
        printerDTO.setMaxWidth(printer.getMaxWidth());
        printerDTO.setMaxHeight(printer.getMaxHeight());
        printerDTO.setPrinterPrecision(printer.getPrinterPrecision());
        printerDTO.setColor(printer.getColor());
        printerDTO.setMaterial(printer.getMaterial());
        printerDTO.setUserIdFabricante((printer.getUserEntity().getUsername()));
        return printerDTO;
    }
    
    @Override
    public void deletePrinterById(Long id) {
        printerRepository.deleteById(id);
    }

    /*@Override
    public List<PrinterDTO> getPrintersByManufacturer(UserEntity manufacturer) {
        return printerRepository.findByUserEntity(manufacturer).stream()
                .map(printer -> new PrinterDTO(printer.getId(), printer.getModelName(), printer.getPrinterLocation(), printer.getPrinterType(), printer.getPrinterPhoto(), printer.getServicePrice(), 
                printer.getMaxUnities(), printer.getManufacturationSpeed(), printer.getMaxWidth(), printer.getMaxHeight(), printer.getPrinterPrecision(), printer.getColor(), printer.getMaterial(), printer.getUserEntity().getId().toString()))
                .collect(Collectors.toList());
    }*/

    /*@Override
    public List<Printer> getPrintersByManufacturerId(Long manufacturerId) {
        return printerRepository.findByManufacturerId(manufacturerId);
    }*/
    
}