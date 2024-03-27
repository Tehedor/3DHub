package com.dhub.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/loginDesigner")
    public String loginDesigner() {
        return "loginDesigner";
    }

    @GetMapping("/loginManufacturer")
    public String loginManufacturer() {
        return "loginManufacturer";
    }

}
