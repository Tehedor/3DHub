package com.dhub.backend.services;

import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.models.Printer;

import org.springframework.stereotype.Service;
@Service
public class PrinterServiceImpl implements PrinterService{

    @Override
    public PrinterDTO convertToDTO(Printer printer) {
        PrinterDTO printerDTO = new PrinterDTO();
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
        printerDTO.setIdFabricante((printer.getUserEntity().getId()));
        return printerDTO;
    }
    
}