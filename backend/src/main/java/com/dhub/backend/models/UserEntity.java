package com.dhub.backend.models;

import com.dhub.backend.controllers.request.PrinterDTO;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "dni"),
            @UniqueConstraint(columnNames = "username"),
            @UniqueConstraint(columnNames = "email")
        })
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @NotBlank
    @Size(max = 10)
    private String dni;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    private String email;

    @NotBlank
    private String password;

    @Lob
    private byte[] profileImage;

    private String address;

    //Designer
    private Double lat;

    private Double lon;

    private String factAddress;

    @ManyToMany(fetch = FetchType.EAGER, targetEntity = Role.class, cascade = CascadeType.PERSIST)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

 
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userEntity")
    private List<Printer> printers;
 
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userEntity")
    private List<Order> orders;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "designer")
    private List<Ratings> ratingsDesigner;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "manufacturer")
    private List<Ratings> ratingsManufacturer;

    public List<PrinterDTO> getPrintersWithoutUserEntity() {
        return printers.stream()
            .map(printer -> {
                PrinterDTO printerDTO = new PrinterDTO();
                // Copiar todos los atributos de printer a printerDTO
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
                
                return printerDTO;
            })
            .collect(Collectors.toList());
    }
    
}
