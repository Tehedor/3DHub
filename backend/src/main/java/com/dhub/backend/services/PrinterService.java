package com.dhub.backend.services;
import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.models.Printer;

public interface PrinterService {
    
    PrinterDTO convertToDTO(Printer printer);
}
