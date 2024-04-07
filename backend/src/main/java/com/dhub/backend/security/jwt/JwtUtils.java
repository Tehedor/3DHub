package com.dhub.backend.security.jwt;

import java.util.Collection;
import java.util.Date;
import java.util.Set;

import javax.crypto.SecretKey;
import javax.management.relation.Role;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Payload;
import lombok.extern.slf4j.Slf4j;
import java.util.function.Function;

@Slf4j
@Component
public class JwtUtils {
    
    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.time.expiration}")
    private String timeExpiration;

    //Generar token de acceso
    public String generateAccessToken(String username) {


        return Jwts.builder()
            .subject(username)
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + Long.parseLong(timeExpiration)))
            .signWith(getSignatureKey()) 
            .compact();
    }


    //Validar token de acceso
    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                .verifyWith(getSignatureKey())
                .build()
                .parse(token)
                .getPayload();
            return true;
        } catch (Exception e) {
            log.error("Error al validar token: ", e.getMessage());
            return false;
        }
    }


    //Obtener el username del token
    public String getUsernameFromToken (String token) {
        
        return Jwts.parser().verifyWith(getSignatureKey()).build().parseSignedClaims(token).getPayload().getSubject();
    }

    //Obtener un solo claim del token
    public <T> T extractClaim(String token, Function<Claims, T> claimsFunction) {
        Claims claims = extractAllClaims(token);
        return claimsFunction.apply(claims);
    }

    //Obtener claims del token
    public Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSignatureKey()).build().parseSignedClaims(token).getPayload();
    }


    //Obtener firma del token
    private SecretKey getSignatureKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
