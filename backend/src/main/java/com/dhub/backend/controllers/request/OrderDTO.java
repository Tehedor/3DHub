package com.dhub.backend.controllers.request;

import java.sql.Date;
import java.util.Set;

import org.springframework.format.annotation.DateTimeFormat;

import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.UserEntity;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    // @NotBlank
    // @Lob
    // private byte[] file;

    private Long Id;

    private Date orderdate;

    @NotBlank
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date manufacturerdate;

    @NotBlank
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date pickupdate;

    @NotBlank
    private Integer number;
    private EStatus status;

    @NotBlank
    private String specs;

    @NotBlank
    private Long user_id;
}
