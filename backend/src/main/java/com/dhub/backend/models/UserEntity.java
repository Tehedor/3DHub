package com.dhub.backend.models;

import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.controllers.request.UserDTO;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    // @OneToMany(cascade = CascadeType.ALL, mappedBy = "designer")
    // private List<Ratings> ratingsDesigner;

    // @OneToMany(cascade = CascadeType.ALL, mappedBy = "manufacturer")
    // private List<Ratings> ratingsManufacturer;

    public UserDTO getUsersWithoutEntity() {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(this.Id);
        userDTO.setDni(this.dni);
        userDTO.setEmail(this.email);
        userDTO.setUsername(this.username);
        userDTO.setPassword(this.password);
        userDTO.setRoles(this.roles.stream().map(role -> role.getName().name()).collect(Collectors.toSet()));
        userDTO.setLat(this.lat);
        userDTO.setLon(this.lon);
        userDTO.setAddress(this.address);
        userDTO.setFactAddress(this.factAddress);
        return userDTO;
    }

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
                printerDTO.setUserIdFabricante((printer.getUserEntity().getUsername()));
                
                
                return printerDTO;
            })
            .collect(Collectors.toList());
    }

    public List<OrderDTO> getOrdersWithoutUserEntity() {
        return orders.stream()
            .map(order -> {
                OrderDTO orderDTO = new OrderDTO();
                // Copiar todos los atributos de order a orderDTO
                orderDTO.setId(order.getId());
                orderDTO.setOrderdate(order.getOrderdate());
                orderDTO.setSpecs(order.getSpecs());
                orderDTO.setManufacturerdate(order.getManufacturerdate());
                orderDTO.setPickupdate(order.getPickupdate());
                orderDTO.setNumber(order.getNumber());
                orderDTO.setStatus(order.getStatus());
                orderDTO.setUser_id(order.getUserEntity().getId());
                orderDTO.setPrinter_id(order.getPrinter().getId());
                
                return orderDTO;
            })
            .collect(Collectors.toList());
    }

    public List<OrderDTO> getOrdersAndPrintersWithoutUserEntity() {
        return orders.stream()
            .map(order -> {
                OrderDTO orderDTO = new OrderDTO();
                // Copiar todos los atributos de order a orderDTO
                orderDTO.setId(order.getId());
                orderDTO.setOrderdate(order.getOrderdate());
                orderDTO.setSpecs(order.getSpecs());
                orderDTO.setManufacturerdate(order.getManufacturerdate());
                orderDTO.setPickupdate(order.getPickupdate());
                orderDTO.setNumber(order.getNumber());
                orderDTO.setStatus(order.getStatus());
                orderDTO.setUser_id(order.getUserEntity().getId());
                orderDTO.setPrinter_id(order.getUserEntity().getId());
                
                return orderDTO;
            })
            .collect(Collectors.toList());
    }
    
}
