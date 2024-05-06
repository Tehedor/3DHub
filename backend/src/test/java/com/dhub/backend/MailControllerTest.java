package com.dhub.backend;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import org.junit.jupiter.api.BeforeEach;

import com.dhub.backend.controllers.MailController;
import com.dhub.backend.controllers.request.EmailDTO;
import com.dhub.backend.services.IEmailService;


class MailControllerTest {

    @InjectMocks
    MailController mailController;

    @Mock
    IEmailService emailService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSendMail() {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setToUser(new String[]{"test@example.com"});
        emailDTO.setSubject("Test Subject");
        emailDTO.setMessage("Test Message");

        doNothing().when(emailService).sendEmail(emailDTO.getToUser(), emailDTO.getSubject(), emailDTO.getMessage());

        ResponseEntity<?> response = mailController.sendMail(emailDTO);

        verify(emailService, times(1)).sendEmail(emailDTO.getToUser(), emailDTO.getSubject(), emailDTO.getMessage());
        assertEquals(200, response.getStatusCode().value());
        assertEquals("Email sent successfully", ((Map<String, String>) response.getBody()).get("message"));
    }
}
