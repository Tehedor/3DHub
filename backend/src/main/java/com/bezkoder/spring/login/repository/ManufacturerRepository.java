package com.bezkoder.spring.login.repository;

import com.bezkoder.spring.login.models.Manufacturer;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {
  Optional<Manufacturer> findByName(String name);

  Boolean existsByName(String name);
}