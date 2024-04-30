package com.dhub.backend.models;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "orders",
uniqueConstraints = {
	@UniqueConstraint(columnNames = "Id")
})
public class Order { 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long Id;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date orderDate;

	private String file;

	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private EStatus status;

    @Min(value = 1, message = "cantidad debe ser mayor o igual que 1")
	private Integer quantity;

	private String address;

	@NotBlank
	@Size(max = 50)
	private String specs;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date manufacturerDate;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date deliveryDate;

	@ManyToOne
    @JoinColumn(name = "users_id")
    private UserEntity userEntity;

	@ManyToOne(fetch =  FetchType.LAZY)
	@JoinColumn(name = "printer_id")
	private Printer printer;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private List<Ratings> ratings;

}
