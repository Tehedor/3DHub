package com.dhub.backend.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.io.IOException;
import java.util.List;

import com.dhub.backend.models.Printer;
import com.dhub.backend.repository.PrinterRepository;

public class SearchServiceImpl {

    public static void main(String[] args) {
        SearchServiceImpl service = new SearchServiceImpl();
        String location = "Calle de la Princesa, 1. Madrid, España";
        String coordinates = service.coordinates(location);
        System.out.println("Coordinates for " + location + " are: " + coordinates);
    }
    
    private PrinterRepository printerRepository;

    public Long closestPrinter(String locUser) {
        List<Printer> printers = printerRepository.findAll();

        double minDistance = Double.MAX_VALUE;
        Printer closestPrinter = printers.get(0);
        for (Printer printer : printers) {
            double distance = distance(locUser, printer.getPrinterLocation());
            if (distance < minDistance) {
                minDistance = distance;
                closestPrinter = printer;
            }
        }
        return closestPrinter.getId();
    }

    public List<Printer> closestPrinters(String locUser) {
        List<Printer> printers = printerRepository.findAll();
        for (int i = 0; i < printers.size(); i++) {
            for (int j = 0; j < printers.size(); j++) {
                String printerLocI = coordinates(printers.get(i).getPrinterLocation());
                String printerLocJ = coordinates(printers.get(j).getPrinterLocation());
                if (distance(locUser, printerLocI) < distance(locUser, printerLocJ)) {
                    Printer temp = printers.get(i);
                    printers.set(i, printers.get(j));
                    printers.set(j, temp);
                }
            }
        }
        return printers;
    }

    private double distance(String locUser, String printerLocation) {
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

    /*
     * Get coordinates from a location inputed as String
     */
    private String coordinates(String location) {
        URL pythonScriptUrl = getClass().getResource("/python/position.py");
        String pythonScriptPath = pythonScriptUrl.getPath();
        String[] cmd = new String[3];
        cmd[0] = "python3";
        cmd[1] = pythonScriptPath;
        cmd[2] = location;

        String output = "";

        try {
            ProcessBuilder pb = new ProcessBuilder(cmd);
            Process process = pb.start();

            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = null;
            while ((line = in.readLine()) != null) {
                output += line;
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return output;
    }
}
