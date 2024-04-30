package com.dhub.backend.controllers.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrinterDTO {
    private Long Id;

    @NotBlank
    @Size(max = 24)
    private String modelName;

    @NotBlank
    private String printerLocation;

    @NotBlank
    private String printerType;
    
    private String printerPhoto;

    private Double servicePrice;

    private Integer maxUnities;

    @NotBlank
    private String manufacturationSpeed;

    private Double maxWidth;

    private Double maxHeight;

    private Double printerPrecision;

    private String color;

    @NotBlank
    private String material;

    private Long idFabricante;
    
}
