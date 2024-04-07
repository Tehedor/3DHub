package com.dhub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

//import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.dhub.backend.models.Printer;

@Repository
public interface PrinterRepository extends JpaRepository<Printer, Long> {

    //Optional<Printer> findByLocation(String location);

    //boolean existsByLocation(String location);

    //boolean existsByName(String name);

}