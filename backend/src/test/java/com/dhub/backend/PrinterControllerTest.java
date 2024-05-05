package com.dhub.backend;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import com.dhub.backend.controllers.PrinterController;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.GoogleCloudStorageService;
import com.dhub.backend.services.PrinterService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.dhub.backend.controllers.request.PrinterDTO;
import java.util.Optional;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;


@ExtendWith(MockitoExtension.class)
@JsonIgnoreProperties(ignoreUnknown = true)
class PrinterControllerTest {

    @Mock
    UserRepository userRepository;

    @Mock
    GoogleCloudStorageService googleCloudStorageService;

    @Mock
    PrinterService printerService;

    @Mock
    PrinterRepository printerRepository;

    @InjectMocks
    PrinterController printerController;
/*
    @Test
    void testCreatePrinter() throws IOException {
        // Preparar los datos de prueba
        MockMultipartFile file = new MockMultipartFile("file", "hello.txt", "text/plain", "Hello, World!".getBytes());
        String printerString = "{\"id\":1,\"modelName\":\"Printer1\"}";
        PrinterDTO printerDTO = new PrinterDTO();
        printerDTO.setId(1L);
        printerDTO.setModelName("Printer1");
        UserEntity user = new UserEntity();
        user.setId(1L);
        user.setUsername("testUser");
        Printer createdPrinter = new Printer();
        createdPrinter.setId(1L);
        createdPrinter.setModelName("Printer1");

        // Configurar los mocks
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        try{
            when(googleCloudStorageService.uploadPrinerPhoto(any())).thenReturn("urlPhoto");
        } catch (Exception e) {            
        }
        when(printerService.convertToEntity(any())).thenReturn(createdPrinter);

        // Crear un contexto de seguridad falso
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn("testUser");
        SecurityContextHolder.getContext().setAuthentication(auth);

        // Llamar al método que se está probando
        ResponseEntity<Printer> response = printerController.createPrinter(file, printerString);

        // Verificar que las dependencias se llamaron como se esperaba
        verify(userRepository, times(1)).findByUsername(anyString());
        try{
            verify(googleCloudStorageService, times(1)).uploadPrinerPhoto(any());
        } catch (Exception e) {

        }
        verify(printerService, times(1)).convertToEntity(any());
        verify(printerRepository, times(1)).save(any());

        // Asegurarse de que la respuesta es la esperada
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }*/

    @Test
    void testDeleteUser() {
        // Preparar los datos de prueba
        Long printerId = 1L;
        UserEntity user = new UserEntity();
        user.setId(1L);
        user.setUsername("testUser");
        Printer printer = new Printer();
        printer.setId(printerId);
        printer.setUserEntity(user);

        // Configurar los mocks
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(printerRepository.findById(printerId)).thenReturn(Optional.of(printer));

        // Crear un contexto de seguridad falso
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn("testUser");
        SecurityContextHolder.getContext().setAuthentication(auth);

        // Llamar al método que se está probando
        printerController.deleteUser(printerId);

        // Verificar que las dependencias se llamaron como se esperaba
        verify(userRepository, times(1)).findByUsername(anyString());
        verify(printerRepository, times(1)).findById(printerId);
        verify(printerRepository, times(1)).deleteById(printerId);
    }
}