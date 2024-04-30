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
			UserEntity userEntity = UserEntity.builder()
				.dni("11111111A")
				.email("denzel@gmail.com")
				.username("denzel")
				.password(passwordEncoder.encode("1111"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_ADMIN).build()))
				.lat(40.4165)
				.lon(-3.70256)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.build();
			UserEntity userEntity2 = UserEntity.builder()
				.dni("222222222A")
				.email("sergio@gmail.com")
				.username("sergio")
				.password(passwordEncoder.encode("2222"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_DESIGNER).build()))
				.lat(40.4165)
				.lon(-3.70256)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.build();
			UserEntity userEntity3 = UserEntity.builder()
				.dni("333333333A")
				.email("claudia@gmail.com")
				.username("claudia")
				.password(passwordEncoder.encode("3333"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_MANUFACTURER).build()))
				.lat(40.4165)
				.lon(-3.70256)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.build();

			Printer printer = Printer.builder()
				.modelName("ender 3")
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
				.userEntity(userEntity)
				.build();
			Printer printer2 = Printer.builder()
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
				.userEntity(userEntity)
				.build();

			Order order = Order.builder()
				.orderdate(new Date(System.currentTimeMillis()))
				.number(2)
				.specs("specs1")
				.manufacturerdate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.SEND)
				.pickupdate(new Date(System.currentTimeMillis()))
				.userEntity(userEntity)
				.printer(printer)
				.build();
			Order order2 = Order.builder()
				.orderdate(new Date(System.currentTimeMillis()))
				.number(2)
				.specs("specs1")
				.manufacturerdate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.SEND)
				.pickupdate(new Date(System.currentTimeMillis()))
				.userEntity(userEntity)
				.printer(printer2)
				.build();

			Ratings rating = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(4)
				.manufacturerRating(3)
				.textRating("good")
				.file(null)
				.order(order2)
				.build();
			
			userRepository.save(userEntity);
			userRepository.save(userEntity2);
			userRepository.save(userEntity3);
			printerRepository.save(printer);
			printerRepository.save(printer2);
			orderRepository.save(order);
			orderRepository.save(order2);
			ratingsRepository.save(rating);
		};
	}

}
