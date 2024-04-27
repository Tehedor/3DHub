package com.dhub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

//import org.hibernate.mapping.List;

//import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.dhub.backend.models.Printer;
@Repository
public interface PrinterRepository extends JpaRepository<Printer, Long> {

    //List<Printer> findByManufacturerUsername(Long manufacturerUsername);

    /*List<Printer> findByManufacturerId(Long manufacturerId);*/

    //Optional<Printer> findByLocation(String location);

    //boolean existsByLocation(String location);

    //boolean existsByName(String name);

}