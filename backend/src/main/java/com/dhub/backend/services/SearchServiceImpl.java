package com.dhub.backend.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.dhub.backend.models.EPrinterType;
import com.dhub.backend.models.Printer;
import com.dhub.backend.repository.PrinterRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Service
public class SearchServiceImpl implements SearchService{

    private static final String OS = System.getProperty("os.name").toLowerCase();

    public String coordinates(String location) {
        // Ruta al script de Python
        String pythonScriptPath; // Actualiza la ruta según la ubicación de tu script
        if (OS.contains("win")) {
            pythonScriptPath = "backend\\src\\main\\resources\\python\\position.py";
        } else {
            pythonScriptPath = "backend/src/main/resources/python/position.py";
        } 

        // Comando para ejecutar el script de Python
        String[] cmd = new String[3];
        cmd[0] = "python"; // Ejecuta el comando "python" en lugar de "python3" en Windows
        cmd[1] = pythonScriptPath;
        cmd[2] = location;

        String output = "";

        try {
            // Crear el proceso para ejecutar el script de Python
            ProcessBuilder pb = new ProcessBuilder(cmd);
            Process process = pb.start();

            // Leer la salida del proceso
            InputStream inputStream = process.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            String line = null;
            while ((line = reader.readLine()) != null) {
                output += line;
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return output;
    }

    @Override
    public Long getDuration(String origen, String destino){
                // Construye la URL con los parámetros recibidos
        String apiUrl = "https://maps.googleapis.com/maps/api/distancematrix/json" +
                "?origins=" + origen +
                "&destinations=" + destino +
                "&units=" + "decimal" +
                "&key=" + "AIzaSyBpo1XjPia4u_NUHO60g8kILg9vgZb9AP0";

        // Realiza la solicitud GET usando RestTemplate
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
        // Parsea la respuesta JSON
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode root = mapper.readTree(response.getBody());
            JsonNode rowsNode = root.get("rows");
            JsonNode elementsNode = rowsNode.get(0).get("elements");
            JsonNode durationNode = elementsNode.get(0).get("duration");
            Long durationText = durationNode.get("value").asLong();
            
            // Devuelve el texto de la duración
            return durationText;
        } catch (Exception e) {
            e.printStackTrace();
            // Maneja el error de alguna manera adecuada, por ejemplo, lanzando una excepción personalizada
            throw new RuntimeException("Error al procesar la respuesta JSON");
        }
    }
}
