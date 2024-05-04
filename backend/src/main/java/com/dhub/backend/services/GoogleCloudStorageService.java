package com.dhub.backend.services;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.auth.Credentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;


@Service
public class GoogleCloudStorageService {
    private static String projectId ="dhub-422309";
	private static String bucketName = "3dhub_isst";
    private static final String OS = System.getProperty("os.name").toLowerCase();
    private String credentialsPath;  


    public String uploadPrinerPhoto(MultipartFile file) throws Exception {
        if (OS.contains("win")) {
            credentialsPath = "backend\\src\\main\\resources\\credentials.json";
        } else {
            credentialsPath = "backend/src/main/resources/credentials.json";
        }  
        // Obtener el nombre del archivo y crear el objeto BlobId
        String fileName = "printers/" + file.getOriginalFilename();
        BlobId blobId = BlobId.of(bucketName, fileName);

        // Crear el objeto BlobInfo con el nombre del archivo y el tipo de contenido
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(file.getContentType())
                .build();

        // Transferir el archivo a un archivo temporal en el servidor
        Path tempFilePath = Files.createTempFile("temp", null);
        file.transferTo(tempFilePath.toFile());

        // Obtener las credenciales desde el archivo JSON
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsPath));

        // Configurar manualmente Storage con las credenciales y el proyecto
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(credentials)
                .setProjectId(projectId)
                .build()
                .getService();

        // Subir el archivo desde el archivo temporal al bucket
        storage.createFrom(blobInfo, tempFilePath);

        // Eliminar el archivo temporal
        Files.delete(tempFilePath);

        // Construir y devolver la URL pública del archivo subido
        String publicUrl = "https://storage.googleapis.com/" + bucketName + "/" + fileName;
        return publicUrl;
    }
    public String uploadRatingsPhoto(MultipartFile file) throws Exception {
        if (OS.contains("win")) {
            credentialsPath = "backend\\src\\main\\resources\\credentials.json";
        } else {
            credentialsPath = "backend/src/main/resources/credentials.json";
        }  

        // Obtener el nombre del archivo y crear el objeto BlobId
        String fileName = "ratings/" + file.getOriginalFilename();
        BlobId blobId = BlobId.of(bucketName, fileName);

        // Crear el objeto BlobInfo con el nombre del archivo y el tipo de contenido
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(file.getContentType())
                .build();

        // Transferir el archivo a un archivo temporal en el servidor
        Path tempFilePath = Files.createTempFile("temp", null);
        file.transferTo(tempFilePath.toFile());

        // Obtener las credenciales desde el archivo JSON
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsPath));

        // Configurar manualmente Storage con las credenciales y el proyecto
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(credentials)
                .setProjectId(projectId)
                .build()
                .getService();

        // Subir el archivo desde el archivo temporal al bucket
        storage.createFrom(blobInfo, tempFilePath);

        // Eliminar el archivo temporal
        Files.delete(tempFilePath);

        // Construir y devolver la URL pública del archivo subido
        String publicUrl = "https://storage.googleapis.com/" + bucketName + "/" + fileName;
        return publicUrl;
    }
}
