package com.dhub.backend.services;

import com.dhub.backend.controllers.request.UserDTO;
import com.dhub.backend.models.UserEntity;

public interface UserEntityService {
    
    UserDTO convertToDTO(UserEntity userEntity);

}
