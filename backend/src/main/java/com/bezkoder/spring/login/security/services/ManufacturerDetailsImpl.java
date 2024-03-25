package com.bezkoder.spring.login.security.services;


import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bezkoder.spring.login.models.Manufacturer;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class ManufacturerDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String name;

  private String email;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;

  public ManufacturerDetailsImpl(Long id, String name, String email, String password,
      Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public static ManufacturerDetailsImpl build(Manufacturer manufacturer) {
    List<GrantedAuthority> authorities = manufacturer.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

    return new ManufacturerDetailsImpl(
        manufacturer.getId(), 
        manufacturer.getName(), 
        manufacturer.getEmail(),
        manufacturer.getPassword(), 
        authorities);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return name;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    ManufacturerDetailsImpl manufacturer = (ManufacturerDetailsImpl) o;
    return Objects.equals(id, manufacturer.id);
  }
}

