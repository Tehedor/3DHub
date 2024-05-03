package com.dhub.backend.controllers.request;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.dhub.backend.models.EColor;
import com.dhub.backend.models.EMaterial;
import com.dhub.backend.models.EPrinterType;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrinterDTO {
    
    private Long Id;

    @NotBlank
    private String modelName;

    @NotBlank
    private String printerLocation;
    
    @NotBlank
    private EPrinterType printerType;

    private String urlPhoto;

    private Double servicePrice;

    private Integer maxUnities;

    @NotBlank
    private String manufacturationSpeed;

    private Double maxWidth;

    private Double maxHeight;

    private Double printerPrecision;

    private EColor color;

    @NotNull
    private EMaterial material;

    private Long idFabricante;
    
}
