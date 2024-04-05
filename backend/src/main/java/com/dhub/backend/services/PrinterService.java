package com.dhub.backend.services;
import com.dhub.backend.models.Printer;
import java.util.List;

public interface PrinterService {
    public Printer createPrinter(Printer printer);
    public List<Printer> getAllPrinters();
}
