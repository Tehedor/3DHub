package com.dhub.backend.controllers.request;

import java.sql.Date;
import java.util.Set;

import org.springframework.format.annotation.DateTimeFormat;

import com.dhub.backend.models.EStatus;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderDTO {
    // @NotBlank
    // @Lob
    // private byte[] file;

    @NotBlank
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date manufacturerdate;

    @NotBlank
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date pickupdate;

    @NotBlank
    private Integer number;
    private EStatus status;
}
