package com.dhub.backend.util;

import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import org.springframework.util.FileCopyUtils;

public class FileUploadUtil {
    public static void saveFile(String uploadDir, String fileName, MultipartFile file) throws IOException {
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs(); // Crea el directorio si no existe
        }
        // Guarda el archivo en el sistema de archivos
        File serverFile = new File(uploadDir + fileName);
        FileCopyUtils.copy(file.getBytes(), serverFile);
    }
}
