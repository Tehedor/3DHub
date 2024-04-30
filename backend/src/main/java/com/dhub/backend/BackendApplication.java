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
import com.dhub.backend.models.Printer.PrinterType;
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
				.lat(40.4165)
				.lon(-3.70256)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.build();
			UserEntity manufacturer = UserEntity.builder()
				.dni("333333333A")
				.email("fabricante@gmail.com")
				.username("fabricante")
				.password(passwordEncoder.encode("fabricante"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_MANUFACTURER).build()))
				.lat(40.4165)
				.lon(-3.70256)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.build();

/**
 * Creación de impresoras
*/

			Printer printer = Printer.builder()
				.modelName("ender 1")
				.printerLocation("creality")
				.printerType(PrinterType.LASER)
				.printerPhoto(null)
				.servicePrice(10.0)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color("rojo")
				.material("plastic")
				.userEntity(manufacturer)
				.build();
			Printer printer2 = Printer.builder()
				.modelName("ender 2")
				.printerLocation("creality")
				.printerType("Room 1")
				.printerPhoto(null)
				.servicePrice(10.0)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color("rojo")
				.material("plastic")
				.userEntity(manufacturer)
				.build();
				
			Printer printer3 = Printer.builder()
				.modelName("ender 3")
				.printerLocation("creality")
				.printerType(PrinterType.INKJET)
				.printerPhoto(null)
				.servicePrice(10.0)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color("rojo")
				.material("plastic")
				.userEntity(manufacturer)
				.build();
			Printer printer4 = Printer.builder()
				.modelName("ender 4")
				.printerLocation("creality")
				.printerType("Room 1")
				.printerPhoto(null)
				.servicePrice(10.0)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color("rojo")
				.material("plastic")
				.userEntity(manufacturer)
				.build();


/**
 * Creación de pedidos
 */

			Order order = Order.builder()
				.orderdate(new Date(System.currentTimeMillis()))
				.number(2)
				.specs("specs1")
				.manufacturerdate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.KART)
				.pickupdate(new Date(System.currentTimeMillis()))
				.userEntity(designer)
				.printer(printer)
				.build();
			Order order2 = Order.builder()
				.orderdate(new Date(System.currentTimeMillis()))
				.number(2)
				.specs("specs1")
				.manufacturerdate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.PAY)
				.pickupdate(new Date(System.currentTimeMillis()))
				.userEntity(designer)
				.printer(printer2)
				.build();
			Order order3 = Order.builder()
				.orderdate(new Date(System.currentTimeMillis()))
				.number(2)
				.specs("specs1")
				.manufacturerdate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.SEND)
				.pickupdate(new Date(System.currentTimeMillis()))
				.userEntity(designer)
				.printer(printer3)
				.build();
			Order order4 = Order.builder()
				.orderdate(new Date(System.currentTimeMillis()))
				.number(2)
				.specs("specs1")
				.manufacturerdate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.pickupdate(new Date(System.currentTimeMillis()))
				.userEntity(designer)
				.printer(printer4)
				.build();

			Order order5 = Order.builder()
				.orderdate(new Date(System.currentTimeMillis()))
				.number(2)
				.specs("specs1")
				.manufacturerdate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.pickupdate(new Date(System.currentTimeMillis()))
				.userEntity(designer)
				.printer(printer4)
				.build();

			Order order6 = Order.builder()
				.orderdate(new Date(System.currentTimeMillis()))
				.number(2)
				.specs("specs1")
				.manufacturerdate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.pickupdate(new Date(System.currentTimeMillis()))
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
				.file(null)
				.order(order5)
				.build();
			Ratings rating2 = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(2)
				.manufacturerRating(1)
				.textRating("bad")
				.file(null)
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
