package com.dhub.backend.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.charset.StandardCharsets;

@Service
public class EmailServiceImpl implements IEmailService {

    @Value("${email.sender}")
    private String emailSender;

    @Autowired
    private JavaMailSender javaMailSender;
    @Override
    public void sendEmail(String[] toUser, String subject, String message) {

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(emailSender);
        mailMessage.setTo(toUser);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        javaMailSender.send(mailMessage);
    }

    @Override
    public void sendEmailFile(String[] toUser, String subject, String message, File file) {

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, StandardCharsets.UTF_8.name());
            helper.setFrom(emailSender);
            helper.setTo(toUser);
            helper.setSubject(subject);
            helper.setText(message);
            helper.addAttachment(file.getName(), file);

            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }
}