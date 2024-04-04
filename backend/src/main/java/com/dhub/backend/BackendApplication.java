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
<<<<<<< Updated upstream
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Ratings;
=======
import com.dhub.backend.models.Printer;
>>>>>>> Stashed changes
import com.dhub.backend.models.Role;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.RatingsRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.repository.PrinterRepository;


import ch.qos.logback.core.status.Status;

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
				.email("denzel@gmail.com")
				.username("denzel")
				.password(passwordEncoder.encode("1111"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_ADMIN).build()))
				
				.build();
			UserEntity userEntity2 = UserEntity.builder()
				.email("sergio@gmail.com")
				.username("sergio")
				.password(passwordEncoder.encode("2222"))
				
				.roles(Set.of(Role.builder().name(ERole.ROLE_DESIGNER).build()))
				.build();
			UserEntity userEntity3 = UserEntity.builder()
				.email("claudia@gmail.com")
				.username("claudia")
				
				.password(passwordEncoder.encode("3333"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_DESIGNER).build()))
				.build();

<<<<<<< Updated upstream
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
				
=======
			Printer printer = Printer.builder()
				.name("HP Deskjet 2130")
				.location("Sala 1")
				.type("Inkjet")
				.photo("null")
				.price(200.0)
				.unities(1)
				.speed("20 ppm")
				.width(20.0)
				.height(10.0)
				.precision(10.0)
				.color("Black")
				.material("Plastic")
>>>>>>> Stashed changes
				.build();

			userRepository.save(userEntity);
			userRepository.save(userEntity2);
			userRepository.save(userEntity3);
<<<<<<< Updated upstream
			orderRepository.save(order);
			ratingsRepository.save(rating);
=======
			printerRepository.save(printer);
>>>>>>> Stashed changes
		};
	}

}
