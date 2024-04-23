package com.dhub.backend.services;
import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.models.Printer;
import java.util.List;

public interface PrinterService {

    List<Printer> getAllPrinters();
    Printer createPrinter(Printer printer);
    //List<Printer> getPrintersByManufacturer(Long manufacturerUsername);

    public List<PrinterDTO> getAllPrintersWithoutUser();
    PrinterDTO getPrinterById(Long id);

    void deletePrinterById(Long id);
    
}
