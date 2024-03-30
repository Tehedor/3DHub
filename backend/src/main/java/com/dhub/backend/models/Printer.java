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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.UniqueConstraint;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "printers",
        uniqueConstraints = 
            @UniqueConstraint(columnNames = "manufacturer_id")
        )
public class Printer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(max = 24)
    private String name;

    @NotBlank
    private String location;

    @NotBlank
    private String type;
    
    @Lob
    private byte[] photo;

    @NotBlank
    private Double price;

    @NotBlank
    private Integer unities;

    @NotBlank
    private String speed;

    @NotBlank
    private Double width;

    @NotBlank
    private Double height;

    @NotBlank
    private Double precision;

    @NotBlank
    private String color;

    @NotBlank
    private String material;

    @ManyToOne
    @JoinColumn(name = "manufacturer_id")
    private Manufacturer manufacturer;

}