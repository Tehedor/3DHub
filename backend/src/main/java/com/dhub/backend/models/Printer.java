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
    private String model_name;

    @NotBlank
    private String printer_location;

    @NotBlank
    private String printer_type;
    
    @Lob
    private byte[] printer_photo;

    private Double service_price;

    
    private Integer max_unities;

    @NotBlank
    private String manufacturation_speed;

    
    private Double max_width;

    
    private Double max_height;

    
    private Double printer_precision;

    
    private String color;

    @NotBlank
    private String material;

    //@ManyToOne
    //@JoinColumn(name = "manufacturer_id")
    //private String manufacturer;

}