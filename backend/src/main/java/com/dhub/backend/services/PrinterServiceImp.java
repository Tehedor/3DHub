package com.dhub.backend.services;

import com.dhub.backend.models.Printer;
import com.dhub.backend.repository.PrinterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PrinterServiceImp implements PrinterService{

    @Autowired
    private PrinterRepository printerRepository;

    public Printer createPrinter(Printer printer) {
        return printerRepository.save(printer);
    }

    @Override
    public List<Printer> getAllPrinters() {
        return StreamSupport.stream(printerRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    /*public List<Printer> getAllPrinters() {
        Iterable<Printer> printersIterable = printerRepository.findAll();
        System.out.println("Printers from repository: " + printersIterable); // Imprime los datos obtenidos del repositorio
        List<Printer> printers = new ArrayList<>();
        printersIterable.forEach(printers::add);
        System.out.println("Printers as List: " + printers); // Imprime la lista de impresoras
        return printers;
    }*/
}