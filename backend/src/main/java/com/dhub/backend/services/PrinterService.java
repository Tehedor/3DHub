package com.dhub.backend.services;
import org.springframework.web.multipart.MultipartFile;

import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.models.EColor;
import com.dhub.backend.models.EMaterial;
import com.dhub.backend.models.EPrinterType;
import com.dhub.backend.models.Printer;

public interface PrinterService {
    
    PrinterDTO convertToDTO(Printer printer);

    Printer createPrinterWithFile(MultipartFile file, String modelName, String printerLocation, EPrinterType printerType, 
    Double servicePrice, Integer maxUnities, String manufacturationSpeed, 
    Double maxWidth, Double maxHeight, Double printerPrecision, EColor color, EMaterial material, Long userId);
}
