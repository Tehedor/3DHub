package com.dhub.backend;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dhub.backend.models.ERole;
import com.dhub.backend.models.Role;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.UserRepository;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepository userRepository;

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
		};
	}

}
