package com.bezkoder.spring.login.payload.response;


import java.util.List;

public class ManufacturerInfoResponse {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    public void setId(Long id) {
        this.id = id;
    }
    public ManufacturerInfoResponse(Long id, String username, String email, List<String> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public List<String> getRoles() {
        return roles;
    }
    
}
