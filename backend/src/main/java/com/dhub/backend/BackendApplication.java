package com.dhub.backend;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dhub.backend.models.ERole;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Role;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.UserRepository;

//import jakarta.validation.constraints.Null;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepository userRepository;

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

			userRepository.save(userEntity);
			userRepository.save(userEntity2);
			userRepository.save(userEntity3);

			Printer printer = Printer.builder()
				.model_name("ender 3")
				.printer_location("creality")
				.printer_type("Room 1")
				.printer_photo(null)
				.service_price(10.0)
				.max_unities(1)
				.manufacturation_speed("60")
				.max_width(220.0)
				.max_height(250.0)
				.printer_precision(0.1)
				.color("rojo")
				.material("plastic")
				.build();
			printerRepository.save(printer);
		};
	}

}
