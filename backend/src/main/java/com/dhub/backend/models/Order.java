package com.dhub.backend.models;

import java.sql.Date;
import java.util.HashSet;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;




@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity 
@Table(name = "orders")
public class Order { 
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY) private Long Id;
	 
@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private Date orderdaten;
	// @NotBlank
	// @Size(max = 20)
	// private String orderdaten;

// @Lob
// private byte[] file;

@NotBlank
@Size(max = 50)
private String number;

@NotBlank
@Size(max = 50)
private String specs;

@NotBlank
@Size(max = 50)
private String maxdate;

@NotBlank
@Size(max = 50)
private String pickupdate;

@JsonManagedReference
 @ManyToOne(cascade = CascadeType.ALL)
 @JoinColumn(name = "printer_id")
private Printer printer;



// @JsonManagedReference
// 	@OneToOne(cascade = CascadeType.ALL, mappedBy = "pedido")
// 	private Pagamento pagamento;

}
