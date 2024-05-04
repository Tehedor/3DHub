package com.dhub.backend;

import java.sql.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dhub.backend.models.ERole;
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.Role;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.models.EColor;
import com.dhub.backend.models.EMaterial;
import com.dhub.backend.models.EPrinterType;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.RatingsRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.repository.PrinterRepository;


@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	RatingsRepository ratingsRepository;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	PrinterRepository printerRepository;

	@Bean
	CommandLineRunner init(){
		return args -> {


/**
 * Creación de usuarios
 */

			UserEntity designer = UserEntity.builder()
				.dni("222222222A")
				.email("diseñador@gmail.com")
				.username("diseñador")
				.password(passwordEncoder.encode("diseñador"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_DESIGNER).build()))
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.build();
			UserEntity manufacturer = UserEntity.builder()
				.dni("333333333A")
				.email("fabricante@gmail.com")
				.username("fabricante")
				.password(passwordEncoder.encode("fabricante"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_MANUFACTURER).build()))
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.iban("ES7921000813610123456789")
				.build();

/**
 * Creación de impresoras
*/

			Printer printer = Printer.builder()
				.modelName("ender 1")
				.printerLocation("creality")
				.printerType(EPrinterType.FDM)
				.urlPhoto(null)
				.servicePrice(10.0)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color(EColor.BLACK)
				.material(EMaterial.PLASTIC)
				.userEntity(manufacturer)
				.build();
			Printer printer2 = Printer.builder()
				.modelName("ender 2")
				.printerLocation("creality")
				.printerType(EPrinterType.SLA)
				.urlPhoto(null)
				.servicePrice(10.0)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color(EColor.GREEN)
				.material(EMaterial.RESIN)
				.userEntity(manufacturer)
				.build();
				
			Printer printer3 = Printer.builder()
				.modelName("ender 3")
				.printerLocation("creality")
				.printerType(EPrinterType.MSLA)
				.urlPhoto(null)
				.servicePrice(10.0)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color(EColor.BLUE)
				.material(EMaterial.PLASTIC)
				.userEntity(manufacturer)
				.build();
			Printer printer4 = Printer.builder()
				.modelName("ender 4")
				.printerLocation("creality")
				.printerType(EPrinterType.DLP)
				.urlPhoto(null)
				.servicePrice(10.0)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color(EColor.RED)
				.material(EMaterial.RESIN)
				.userEntity(manufacturer)
				.build();


/**
 * Creación de pedidos
 */

			Order order = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.urlPhoto(null)
				.status(EStatus.KART)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer)
				.build();
			Order order2 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.urlPhoto(null)
				.status(EStatus.PAY)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer2)
				.build();
			Order order3 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.urlPhoto(null)
				.status(EStatus.SEND)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer3)
				.build();
			Order order4 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.urlPhoto(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer4)
				.build();

			Order order5 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.urlPhoto(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer4)
				.build();

			Order order6 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.urlPhoto(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer4)
				.build();

/**
 * Creación de reseñas
 */

			Ratings rating = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(4)
				.manufacturerRating(3)
				.textRating("good")
				.urlPhoto(null)
				.order(order5)
				.build();
			Ratings rating2 = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(2)
				.manufacturerRating(1)
				.textRating("bad")
				.urlPhoto(null)
				.order(order6)
				.build();		
				
			userRepository.save(designer);
			userRepository.save(manufacturer);
			printerRepository.save(printer);
			printerRepository.save(printer2);
			printerRepository.save(printer3);
			printerRepository.save(printer4);
			orderRepository.save(order);
			orderRepository.save(order2);
			orderRepository.save(order3);
			orderRepository.save(order4);
			orderRepository.save(order5);
			orderRepository.save(order6);
			ratingsRepository.save(rating);
			ratingsRepository.save(rating2);
		};
	}

}
