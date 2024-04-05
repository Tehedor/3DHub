package com.dhub.backend.services;
import com.dhub.backend.models.Printer;
import java.util.List;

public interface PrinterService {

    List<Printer> getAllPrinters();
    Printer createPrinter(Printer printer);
    
}
