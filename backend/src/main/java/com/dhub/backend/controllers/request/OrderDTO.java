package com.dhub.backend.controllers.request;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.dhub.backend.models.EStatus;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class    OrderDTO {
    private Long Id;

    private Date orderDate;

    private String fileFormat;

    @Lob
    private byte[] file;

    private EStatus status;

    @NotBlank
    private Integer quantity;

    private String address;
    
    @NotBlank
    private String specs;

    @NotBlank
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date manufacturerDate;

    @NotBlank
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date deliveryDate;

    @NotBlank
    private Long user_id;

    @NotBlank
    private Long printer_id;
}
