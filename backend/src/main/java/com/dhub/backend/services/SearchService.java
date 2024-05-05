package com.dhub.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dhub.backend.models.Printer;

public interface SearchService {

    Long getDuration(String origen, String destino);
}