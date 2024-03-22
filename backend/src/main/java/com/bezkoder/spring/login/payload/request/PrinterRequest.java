package com.bezkoder.spring.login.payload.request;

public class PrinterRequest {
    private String manufacturer;
    private String model;

    // getters y setters
    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
