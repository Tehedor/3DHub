package com.dhub.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
//import jakarta.persistence.ManyToOne;
import jakarta.persistence.UniqueConstraint;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "printers",
        uniqueConstraints = 
            @UniqueConstraint(columnNames = "Id")
        )
public class Printer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @NotBlank
    @Size(max = 24)
    private String modelName;

    @NotBlank
    private String printerLocation;

    @NotBlank
    private String printerType;
    
    @Lob
    private byte[] printerPhoto;

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

    //@ManyToOne
    //@JoinColumn(name = "manufacturer_id")
    //private String manufacturer;

}