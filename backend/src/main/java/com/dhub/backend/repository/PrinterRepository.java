package com.dhub.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.dhub.backend.models.Printer;

import java.util.List;

@Repository
public interface PrinterRepository extends CrudRepository<Printer, Long> {

    List<Printer> findAll();
}