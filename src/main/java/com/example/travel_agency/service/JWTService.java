package com.example.travel_agency.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Configuration;
import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import java.io.IOException;
import java.util.Properties;
import org.springframework.beans.factory.InitializingBean;
import java.security.SecureRandom;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
@Configuration
@PropertySource("classpath:application.properties")
public class JWTService implements InitializingBean {

    private static final Logger logger = LoggerFactory.getLogger(JWTService.class);

    @Value("${jwt.secret}") // Load secret from application.properties
    private String secret;

    private SecretKey key;

    private final ResourceLoader resourceLoader;

    public JWTService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        init();
    }

    public void init() {
        try {
            if (secret == null || secret.isEmpty()) {
                // Load from application.properties manually
                Properties properties = new Properties();
                Resource resource = resourceLoader.getResource("classpath:application.properties");
                if (resource.exists()) {
                    try {
                        properties.load(resource.getInputStream());
                        secret = properties.getProperty("jwt.secret");
                        if (secret == null || secret.isEmpty()) {
                            throw new RuntimeException("jwt.secret is missing from application.properties");
                        }
                    } catch (IOException e) {
                        logger.error("Error loading application.properties: {}", e.getMessage());
                        throw new RuntimeException("Failed to load application.properties", e);
                    }
                } else {
                    throw new RuntimeException("application.properties file not found");
                }
            }
            // Use Keys.hmacShaKeyFor with the secret directly.  The library handles the decoding.
            this.key = Keys.hmacShaKeyFor(secret.getBytes());

        } catch (Exception e) {
            logger.error("Error initializing JWT secret key: {}", e.getMessage());
            throw new RuntimeException("Failed to initialize JWT secret key", e);
        }
    }

    public String generateToken(String userName) {
        return generateToken(new HashMap<>(), userName);
    }

    public String generateToken(Map<String, Object> extraClaims, String userName) {
        try {
            return Jwts.builder()
                    .setClaims(extraClaims)
                    .setSubject(userName)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000 * 30)) // 30 minutes expiry
                    .signWith(key, SignatureAlgorithm.HS256) // Specify the algorithm
                    .compact();
        } catch (Exception e) {
            logger.error("Error generating JWT token: {}", e.getMessage());
            throw new RuntimeException("Failed to generate JWT token", e);
        }
    }

    private SecretKey getKey() {
        return key;  // Return the initialized key
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder() // Start with the parser builder
                    .setSigningKey(getKey()) // Use setSigningKey
                    .build()
                    .parseClaimsJws(token)  // Use parseClaimsJws
                    .getBody();
        } catch (Exception e) {
            logger.error("Error extracting claims from JWT token: {}", e.getMessage());
            throw new RuntimeException("Failed to extract claims", e);
        }
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String userName = extractUsername(token);
            return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (Exception e) {
            logger.error("Error validating token: {}", e.getMessage());
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public static String generateSecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] keyBytes = new byte[32]; // 256 bits
        random.nextBytes(keyBytes);
        return Base64.getEncoder().encodeToString(keyBytes);
    }
}
