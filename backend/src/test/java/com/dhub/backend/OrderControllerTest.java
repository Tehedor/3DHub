package com.dhub.backend;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import com.dhub.backend.controllers.OrderController;
import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.OrderService;
import com.dhub.backend.services.RatingsService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.security.core.context.SecurityContext;
import java.io.IOException;


@ExtendWith(MockitoExtension.class)
@JsonIgnoreProperties(ignoreUnknown = true)
class OrderControllerTest {

    @Mock
    OrderService orderService;

    @Mock
    RatingsService ratingsService;

    @InjectMocks
    OrderController orderController;

    @Mock
    UserRepository userRepository;

    @Mock
    OrderRepository orderRepository;

    @Mock
    PrinterRepository printerRepository;

    @Mock
    Authentication authentication;

    @Mock
    SecurityContext securityContext;

    @Test
    void testGetPrinterOrderRatings() {
        // Preparar los datos de prueba
        Long printerId = 1L;
        Ratings rating = new Ratings();
        rating.setId(1L);
        rating.setProductRating(5);
        RatingsDTO ratingDTO = new RatingsDTO();
        ratingDTO.setId(1L);
        ratingDTO.setProductRating(5);

        // Configurar los mocks
        when(orderService.getRatingsByPrinterId(printerId)).thenReturn(Arrays.asList(rating));
        when(ratingsService.convertToDTO(rating)).thenReturn(ratingDTO);

        // Llamar al método que se está probando
        ResponseEntity<List<RatingsDTO>> response = orderController.getPrinterOrderRatings(printerId);

        // Verificar que las dependencias se llamaron como se esperaba
        verify(orderService, times(1)).getRatingsByPrinterId(printerId);
        verify(ratingsService, times(1)).convertToDTO(rating);

        // Asegurarse de que la respuesta es la esperada
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        assertEquals(ratingDTO, response.getBody().get(0));
    }

    @Test
    void testUploadFile() throws IOException {
        Long id = 1L;
        String username = "testUser";
        UserEntity user = new UserEntity();
        user.setId(id);
        user.setUsername(username);
        Order order = new Order();
        order.setId(id);
        order.setUserEntity(user);

        when(authentication.getName()).thenReturn(username);
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(orderRepository.findById(id)).thenReturn(Optional.of(order));

        ResponseEntity<Printer> response = orderController.uploadFile(id);

        verify(orderRepository, times(1)).save(order);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

}