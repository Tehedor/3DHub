package com.dhub.backend;


import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import com.dhub.backend.controllers.RatingsController;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.RatingsRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.GoogleCloudStorageService;
import com.dhub.backend.services.RatingsService;
import java.io.IOException;
import java.util.Optional;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;



@ExtendWith(MockitoExtension.class)
class RatingsControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private GoogleCloudStorageService googleCloudStorageService;

    @Mock
    private RatingsService ratingsService;

    @Mock
    private RatingsRepository ratingsRepository;

    @InjectMocks
    private RatingsController ratingsController;

    /*@Test
    void testCreateReview() throws IOException {
        // Crear datos de prueba
        MultipartFile file = Mockito.mock(MultipartFile.class);
        String ratingsString = "{}";
        UserEntity user = new UserEntity();
        user.setId(1L);
        Order order = new Order();
        order.setId(1L);
        order.setUserEntity(user);
        Ratings ratings = new Ratings();

        // Configurar el comportamiento de las dependencias simuladas
        Mockito.when(userRepository.findByUsername(null)).thenReturn(Optional.of(user));
        Mockito.when(orderRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(order));
        try {
            Mockito.when(googleCloudStorageService.uploadRatingsPhoto(Mockito.any())).thenReturn("urlPhoto");
        } catch (Exception e) {
            // Handle the exception here
            e.printStackTrace();
        }        Mockito.when(ratingsService.convertToEntity(Mockito.any())).thenReturn(ratings);
        Mockito.when(ratingsRepository.findByOrderId(Mockito.anyLong())).thenReturn(null);

        // Llamar al método
        ResponseEntity<HttpStatus> response = ratingsController.createReview(file, ratingsString);

        // Verificar el resultado
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        // Verificar las llamadas a las dependencias simuladas
        Mockito.verify(userRepository).findByUsername(Mockito.anyString());
        Mockito.verify(orderRepository).findById(Mockito.anyLong());
        try {
            Mockito.when(googleCloudStorageService.uploadRatingsPhoto(Mockito.any())).thenReturn("urlPhoto");
        } catch (Exception e) {
            // Handle the exception here
            e.printStackTrace();
        }        Mockito.verify(ratingsService).convertToEntity(Mockito.any());
        Mockito.verify(ratingsRepository).findByOrderId(Mockito.anyLong());
        Mockito.verify(ratingsRepository).save(Mockito.any());
    }*/
}
