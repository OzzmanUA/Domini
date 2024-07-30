package com.domini.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Component
public class JwtTokenUtils {

    private final Key secretKey;
    private final long jwtLifetime;

    public JwtTokenUtils(
            @Value("${jwt.secret.key}") String secret,
            @Value("${jwt.lifetime}") String jwtLifetime) {
        // Проверяем, что ключ и время жизни не пустые
        if (secret == null || secret.isEmpty()) {
            throw new IllegalArgumentException("JWT secret key must not be empty");
        }
        if (jwtLifetime == null || jwtLifetime.isEmpty()) {
            throw new IllegalArgumentException("JWT lifetime must not be empty");
        }

        // Создаем ключ из строки секрета
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
        // Парсим время жизни токена
        this.jwtLifetime = Duration.parse(jwtLifetime).toMillis();
    }

    public String generateToken(UserDetails userDetails) {
        Claims claims = Jwts.claims().setSubject(userDetails.getUsername());
        claims.put("roles", userDetails.getAuthorities());

        Date issuedDate = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(issuedDate.getTime() + jwtLifetime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(issuedDate)
                .setExpiration(expirationDate)
                .signWith(secretKey) // Указываем ключ для подписи
                .compact();
    }

    public String generateRefreshToken(HashMap<String, Object> claims, UserDetails userDetails) {
        Date issuedDate = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(issuedDate.getTime() + jwtLifetime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(issuedDate)
                .setExpiration(expirationDate)
                .signWith(secretKey) // Указываем ключ для подписи
                .compact();
    }

    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)              // Устанавливаем ключ для проверки подписи
                .build()
                .parseClaimsJws(token)                 // Парсим токен и проверяем подпись
                .getBody();                            // Извлекаем клеймы из токена
    }

    public String getUsernameFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.getSubject();
    }

    public List<String> getRolesFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.get("roles", List.class);     // Извлекаем роли из токена
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expirationDate.before(new Date());
    }
}
