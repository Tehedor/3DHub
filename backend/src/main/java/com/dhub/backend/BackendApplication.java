package com.dhub.backend;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Set;

import org.aspectj.weaver.ast.Or;
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
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.RatingsRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.repository.PrinterRepository;


import ch.qos.logback.core.status.Status;

import ch.qos.logback.core.status.Status;

//import jakarta.validation.constraints.Null;

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
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.roles(Set.of(Role.builder().name(ERole.ROLE_MANUFACTURER).build()))
				.build();

			// 	String filePath = "C:\\Users\\admin\\Desktop\\ISST PROYECTO\\3DHub\\backend\\descarga.zip";


			// byte[] fileContent = Files.readAllBytes(Paths.get(filePath));
			
			Order order = Order.builder()
				.orderdate(new Date(System.currentTimeMillis()))
				.number(2)
				.specs("specs1")
				.manufacturerdate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.SEND)
				.pickupdate(new Date(System.currentTimeMillis()))
				.build();

			Ratings rating = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productrating(4)
				.manufacturerating(3)
				.textrating("good")
				.file(null)
				.idmanufacturer("sergio")
				.designer("claudia")
				.build();

			Printer printer = Printer.builder()
				.modelName("ender 3")
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
				.build();

			
			userRepository.save(userEntity);
			userRepository.save(userEntity2);
			userRepository.save(userEntity3);
			orderRepository.save(order);
			printerRepository.save(printer);
			ratingsRepository.save(rating);	
		};
	}

}
