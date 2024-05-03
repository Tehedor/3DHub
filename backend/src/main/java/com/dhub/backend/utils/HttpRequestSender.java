package com.dhub.backend.utils;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpRequestSender {
    public static String sendMultipartFormDataRequest(String urlString, MultipartFile file, String jsonData) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("POST");
        connection.setDoOutput(true);

        String boundary = "Boundary-" + System.currentTimeMillis();
        connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);

        try (
            OutputStream outputStream = connection.getOutputStream();
            PrintWriter writer = new PrintWriter(new OutputStreamWriter(outputStream, "UTF-8"), true);
        ) {
            // Adjuntar el archivo
            writer.append("--" + boundary).append("\r\n");
            writer.append("Content-Disposition: form-data; name=\"file\"; filename=\"" + file.getOriginalFilename() + "\"").append("\r\n");
            writer.append("Content-Type: application/octet-stream").append("\r\n");
            writer.append("\r\n");
            writer.flush();

            try (InputStream fileInputStream = file.getInputStream()) {
                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
                outputStream.flush();
            }

            writer.append("\r\n").flush();

            // Adjuntar los datos JSON
            writer.append("--" + boundary).append("\r\n");
            writer.append("Content-Disposition: form-data; name=\"data\"").append("\r\n");
            writer.append("Content-Type: application/json; charset=UTF-8").append("\r\n");
            writer.append("\r\n");
            writer.append(jsonData).append("\r\n");
            writer.flush();

            // Finalizar la solicitud
            writer.append("--" + boundary + "--").append("\r\n");
            writer.flush();
        }

        // Leer la respuesta del servidor
        StringBuilder responseBody = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                responseBody.append(line);
            }
        }

        connection.disconnect();

        return responseBody.toString();
    }

     public static double getPriceFromResponse(String responseBody) throws IOException {
        // Parsear el cuerpo de la respuesta JSON utilizando ObjectMapper
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(responseBody);

        // Obtener el nodo "result" del cuerpo de la respuesta
        JsonNode resultNode = rootNode.path("result");

        // Obtener el valor de "price" del nodo "result"
        double price = resultNode.path("price").asDouble();
        return price;
    }
}
