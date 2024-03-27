package com.dhub.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.dhub.backend.models.Role;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long>{
    
}
