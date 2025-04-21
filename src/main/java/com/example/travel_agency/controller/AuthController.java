package com.example.travel_agency.controller;

import com.example.travel_agency.dto.AuthTokenDTO;
import com.example.travel_agency.dto.UserLoginDTO;
import com.example.travel_agency.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService; // Inject JWTService directly

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JWTService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserLoginDTO userLoginDTO) {
        try {
            // 1. Authenticate credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userLoginDTO.getUsername(),
                            userLoginDTO.getPassword()
                    )
            );

            // If authentication is successful, the Authentication object is populated
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 2. Generate token
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtService.generateToken(userDetails.getUsername());

            // 3. Return the token
            AuthTokenDTO authTokenDTO = new AuthTokenDTO();
            authTokenDTO.setAuthenticated(true);
            authTokenDTO.setToken(token);
            authTokenDTO.setMessage("Authentication successful");

            return ResponseEntity.ok(authTokenDTO);

        } catch (AuthenticationException e) {
            AuthTokenDTO authTokenDTO = new AuthTokenDTO();
            authTokenDTO.setAuthenticated(false);
            authTokenDTO.setMessage("Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authTokenDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during authentication: " + e.getMessage());
        }
    }
}