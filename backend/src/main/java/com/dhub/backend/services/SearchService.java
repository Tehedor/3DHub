package com.dhub.backend.services;

import java.util.List;
import com.dhub.backend.models.Printer;

public interface SearchService {

    Long closestPrinter(String locUser);
    List<Printer> closestPrinters(String locUser);
}