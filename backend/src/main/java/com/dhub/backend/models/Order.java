package com.dhub.backend.models;

import java.sql.Date;
import java.util.HashSet;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Min;
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
@Table(name = "orders",
uniqueConstraints = {
	@UniqueConstraint(columnNames = "Id")
})
public class Order { 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long Id;
	
	 
 	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date orderdate;

    @Min(value = 1, message = "Valoracion debe ser mayor o igual que 1")
	private Integer number;

	// TODO: Turn into NotBlank
	//@NotBlank
	@Size(max = 50)
	private String specs;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date pickupdate;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date manufacturerdate;

	@Lob
	private byte[] file;

	 
	
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private EStatus status;

	@ManyToOne
    @JoinColumn(name = "users_id")
    private UserEntity userEntity;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
	private List<Printer> printers;
	

// @JsonManagedReference
//  @ManyToOne(cascade = CascadeType.ALL)
//  @JoinColumn(name = "printer_id")
// private Printer printer;



// @JsonManagedReference
// 	@OneToOne(cascade = CascadeType.ALL, mappedBy = "pedido")
// 	private Pagamento pagamento;

}
