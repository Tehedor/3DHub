package com.dhub.backend.models;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity 
@Table(name = "ratings",
uniqueConstraints = {
	@UniqueConstraint(columnNames = "Id")
})

public class Ratings {
    @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY) private Long Id;

     

 @JsonFormat(pattern = "dd/MM/yyyy")
	 private Date date;
    
    @Min(value = 1, message = "Valoracion debe ser mayor o igual que 1")
    @Max(value = 5, message = "El número debe ser menor o igual que 5")
    private  Integer productrating;

    @Min(value = 1, message = "Valoracion debe ser mayor o igual que 1")
    @Max(value = 5, message = "El número debe ser menor o igual que 5")
    private Integer manufacturerating;

    @NotBlank
	@Size(max = 50)
	private String textrating;

    @Lob
	 private byte[] file;


		@NotBlank
	@Size(max = 50)
	private String idmanufacturer;

	
	@NotBlank
	@Size(max = 50)
	private String designer;

 


}