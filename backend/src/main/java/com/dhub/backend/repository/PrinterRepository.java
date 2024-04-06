package com.dhub.backend.repository;

//import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.dhub.backend.models.Printer;

@Repository
public interface PrinterRepository extends CrudRepository<Printer, Long> {

    //Optional<Printer> findByLocation(String location);

    //boolean existsByLocation(String location);

    //boolean existsByName(String name);

}