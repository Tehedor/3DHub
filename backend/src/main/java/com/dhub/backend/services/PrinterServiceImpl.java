package com.dhub.backend.services;

import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.models.EColor;
import com.dhub.backend.models.EMaterial;
import com.dhub.backend.models.EPrinterType;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.UserRepository;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
@Service
public class PrinterServiceImpl implements PrinterService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public PrinterDTO convertToDTO(Printer printer) {
        PrinterDTO printerDTO = new PrinterDTO();
        printerDTO.setId(printer.getId());
        printerDTO.setModelName(printer.getModelName());
        printerDTO.setPrinterLocation(printer.getPrinterLocation());
        printerDTO.setPrinterType(printer.getPrinterType());
        printerDTO.setPrinterPhoto(printer.getPrinterPhoto());
        printerDTO.setServicePrice(printer.getServicePrice());
        printerDTO.setMaxUnities(printer.getMaxUnities());
        printerDTO.setManufacturationSpeed(printer.getManufacturationSpeed());
        printerDTO.setMaxWidth(printer.getMaxWidth());
        printerDTO.setMaxHeight(printer.getMaxHeight());
        printerDTO.setPrinterPrecision(printer.getPrinterPrecision());
        printerDTO.setColor(printer.getColor());
        printerDTO.setMaterial(printer.getMaterial());
        printerDTO.setIdFabricante((printer.getUserEntity().getId()));
        return printerDTO;
    }

    public static String getFileExtension(String fileName) {
        if (fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        } else {
            return ""; // No hay extensión
        }
    }

    @Override
    public Printer createPrinterWithFile(MultipartFile file, String modelName, String printerLocation, 
    EPrinterType printerType, Double servicePrice, Integer maxUnities, String manufacturationSpeed, 
    Double maxWidth, Double maxHeight, Double printerPrecision, EColor color, EMaterial material, Long userId) {
    UserEntity userEntity = userRepository.findById(userId).orElse(null);
    Printer printer = new Printer();
    printer.setModelName(modelName);
    printer.setPrinterLocation(printerLocation);
    printer.setPrinterType(printerType);
    printer.setFileFormat(getFileExtension(file.getOriginalFilename()));
    try {
        printer.setPrinterPhoto(file.getBytes());
    } catch (IOException e) {
        // Handle the exception here
    }
    printer.setServicePrice(servicePrice);
    printer.setMaxUnities(maxUnities);
    printer.setManufacturationSpeed(manufacturationSpeed);
    printer.setMaxWidth(maxWidth);
    printer.setMaxHeight(maxHeight);
    printer.setPrinterPrecision(printerPrecision);
    printer.setColor(color);
    printer.setMaterial(material);
    printer.setUserEntity(userEntity);
    
        return printer;
    }


}