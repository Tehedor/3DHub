package com.dhub.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.dhub.backend.models.Printer;

@Repository
public interface PrinterRepository extends CrudRepository<Printer, Long> {

    //List<Printer> findByManufacturerUsername(Long manufacturerUsername);

    /*List<Printer> findByManufacturerId(Long manufacturerId);*/

    //Optional<Printer> findByLocation(String location);

    //boolean existsByLocation(String location);

    //boolean existsByName(String name);

}