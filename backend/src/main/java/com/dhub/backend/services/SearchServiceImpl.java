package com.dhub.backend.services;

import java.util.List;

import com.dhub.backend.models.Printer;
import com.dhub.backend.repository.PrinterRepository;

public class SearchServiceImpl {
    
    private PrinterRepository printerRepository;

    public Long closestPrinter(String locUser) {
        List<Printer> printers = printerRepository.findAll();

        double minDistance = Double.MAX_VALUE;
        Printer closestPrinter = printers.get(0);
        for (Printer printer : printers) {
            double distance = distancia(locUser, printer.getPrinterLocation());
            if (distance < minDistance) {
                minDistance = distance;
                closestPrinter = printer;
            }
        }
        return closestPrinter.getId();
    }

    private double distancia(String locUser, String printerLocation) {
        double R = 6371000;
        double theta1 = Math.toRadians(Double.parseDouble(locUser.split(",")[0]));
        double theta2 = Math.toRadians(Double.parseDouble(printerLocation.split(",")[0]));
        double phy1 = Math.toRadians(Double.parseDouble(locUser.split(",")[1]));
        double phy2 = Math.toRadians(Double.parseDouble(printerLocation.split(",")[1]));
        double deltaTheta = theta2 - theta1;
        double deltaPhy = phy2 - phy1;
        double distance = 2 * R * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaTheta / 2),2) + Math.cos(theta1) * Math.cos(theta2) * Math.pow(Math.sin(deltaPhy / 2),2)));

        return distance;
    }

    public List<Printer> closestPrinters(String locUser) {
        List<Printer> printers = printerRepository.findAll();
        for (int i = 0; i < printers.size(); i++) {
            for (int j = 0; j < printers.size(); j++) {
                if (distancia(locUser, printers.get(i).getPrinterLocation()) < distancia(locUser, printers.get(j).getPrinterLocation())) {
                    Printer temp = printers.get(i);
                    printers.set(i, printers.get(j));
                    printers.set(j, temp);
                }
            }
        }
        return printers;
    }
}
