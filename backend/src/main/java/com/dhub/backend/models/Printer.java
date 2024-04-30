package com.dhub.backend.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private EPrinterType printerType;
    
    private String printerPhoto;

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

    @ManyToOne
    @JoinColumn(name = "users_id")
    private UserEntity userEntity;

    // @OneToMany(cascade = CascadeType.ALL, mappedBy = "printer")
    // private List<Ratings> ratings;

    // @ManyToOne
    // @JoinColumn(name = "order_id")
    // private Order order;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "printer")
    private List<Order> orders;

}