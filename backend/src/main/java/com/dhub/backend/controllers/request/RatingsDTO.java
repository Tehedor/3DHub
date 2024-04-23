package com.dhub.backend.controllers.request;

import java.sql.Date;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingsDTO {
    

    private long Id;
    
    private Date date;

    private Integer manufacturerRating;
    private  Integer productRating;

    @Lob
    private byte[] file;

    @NotBlank
    private String textRating;


}
