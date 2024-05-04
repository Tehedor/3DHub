package com.dhub.backend.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dhub.backend.models.EPrinterType;
import com.dhub.backend.models.Printer;
import com.dhub.backend.repository.PrinterRepository;

import jakarta.annotation.PostConstruct;

public class SearchServiceImpl {

    public static void main(String[] args) {
        SearchServiceImpl service = new SearchServiceImpl();
        service.initPrinters();
        System.out.println(service.closestPrinter("Calle Miami, 1, Madrid, España"));
    }
    @Autowired
    private PrinterRepository printerRepository;
    String [] locations = {"Calle de la Princesa, 1, Madrid, España", "Calle de Alcalá, 230, Madrid, España", "Estadio Santiago Bernabéu, Madrid, España"};

    @PostConstruct
    public void initPrinters() {
        for (int i = 0; i < locations.length; i++) {
            Printer printer = new Printer();
            printer.setModelName("Model Name");
            printer.setPrinterLocation(locations[i]);
            printer.setPrinterType(EPrinterType.FDM); // replace with actual type
            printer.setFileFormat("File Format");
            printer.setPrinterPhoto(new byte[0]); // replace with actual photo
            printer.setServicePrice(0.0);
            printer.setMaxUnities(0);
            printer.setManufacturationSpeed("Manufacturation Speed");
            printer.setMaxWidth(0.0);
            printerRepository.save(printer);
        }
    }

    public Long closestPrinter(String locUser) {
        String userLoc = coordinates(locUser);
        List<Printer> printers = printerRepository.findAll();

        double minDistance = Double.MAX_VALUE;
        Printer closestPrinter = printers.get(0);
        for (Printer printer : printers) {
            String printerLoc = coordinates(printer.getPrinterLocation());
            double distance = distance(userLoc, printerLoc);
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
        final double R = 6371000;
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
