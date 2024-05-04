package com.dhub.backend.services;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import com.google.cloud.storage.Blob;


@Service
public class GoogleCloudStorageService {
    private static String projectId ="dhub-422309";
	private static String bucketName = "3dhub_isst";
	private static String objectName = "Horario.png";

    // public String uploadFile() throws Exception{
	// 	Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();

	// 	BlobId blobId = BlobId.of(bucketName, objectName);
	// 	BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("text/plain").build();

	// 	String filePath = "C:\\Users\\denze\\Desktop\\Horario.png";

	// 	storage.createFrom(blobInfo, Paths.get(filePath));
	// 	// System.out
	// 	// 		.println("File " + filePath + " uploaded to bucket " + 
	// 	// 		bucketName + " as "
	// 	// 			 + objectName);
	// 	String publicUrl = "https://storage.googleapis.com/" + bucketName + "/" + objectName;
	// 	return publicUrl;
	// }

	public void downloadFile() throws Exception{
		String destFilePath = "C:\\Users\\denze\\Downloads\\Horario.png";

		Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
		BlobId blobId = BlobId.of(bucketName, objectName);
		Blob blob = storage.get(blobId);

		blob.downloadTo(Paths.get(destFilePath));
		System.out.println("Downloaded object " + objectName + " from bucket name " + bucketName + " to " + destFilePath);
		// storage.get(bucketName, objectName).downloadTo(Paths.get(destFilePath));
		// System.out.println("Downloaded object " + objectName + " from bucket name " + bucketName + " to " + destFilePath);
	}

    public String uploadPrinerPhoto(MultipartFile file) throws Exception {
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

    // Subir el archivo desde el archivo temporal al bucket
    Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    storage.createFrom(blobInfo, tempFilePath);

    // Eliminar el archivo temporal
    Files.delete(tempFilePath);

    // Construir y devolver la URL pública del archivo subido
    String publicUrl = "https://storage.googleapis.com/" + bucketName + "/" + fileName;
    return publicUrl;
}

public String uploadRatingsPhoto(MultipartFile file) throws Exception {
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

    // Subir el archivo desde el archivo temporal al bucket
    Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    storage.createFrom(blobInfo, tempFilePath);

    // Eliminar el archivo temporal
    Files.delete(tempFilePath);

    // Construir y devolver la URL pública del archivo subido
    String publicUrl = "https://storage.googleapis.com/" + bucketName + "/" + fileName;
    return publicUrl;
}


}
