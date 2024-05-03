package com.dhub.backend.services;

import org.springframework.stereotype.Service;

import com.dhub.backend.controllers.request.UserDTO;
import com.dhub.backend.models.UserEntity;

@Service
public class UserEntityServiceImpl implements UserEntityService{
    
    @Override
    public UserDTO convertToDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(userEntity.getId());
        userDTO.setDni(userEntity.getDni());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setUsername(userEntity.getUsername());
        userDTO.setPassword(userEntity.getPassword());
        userDTO.setRoles(userEntity.getRoles());
        userDTO.setProfileImage(userEntity.getProfileImage());
        userDTO.setAddress(userEntity.getAddress());
        userDTO.setFactAddress(userEntity.getFactAddress());
        userDTO.setIban(userEntity.getIban());

        return userDTO;
    }

}
