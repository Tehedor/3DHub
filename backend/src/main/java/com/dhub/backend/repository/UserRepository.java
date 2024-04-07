package com.dhub.backend.repository;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.dhub.backend.models.UserEntity;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long>{

    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findById(Long id);
    
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByDni(String dni);

}
