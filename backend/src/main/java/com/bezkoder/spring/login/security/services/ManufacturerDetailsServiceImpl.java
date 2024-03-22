package com.bezkoder.spring.login.security.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bezkoder.spring.login.models.Manufacturer;
import com.bezkoder.spring.login.repository.ManufacturerRepository;

@Service
public class ManufacturerDetailsServiceImpl implements UserDetailsService {
  @Autowired
  ManufacturerRepository manufacturerRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
    Manufacturer manufacturer = manufacturerRepository.findByName(name)
        .orElseThrow(() -> new UsernameNotFoundException("Manufacturer Not Found with name: " + name));

    return ManufacturerDetailsImpl.build(manufacturer);
  }

}
    

