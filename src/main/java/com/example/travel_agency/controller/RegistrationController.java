package com.example.travel_agency.controller;

import com.example.travel_agency.dto.UserDTO;
import com.example.travel_agency.service.UserService;
import com.example.travel_agency.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {
    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseUtil> registerUser(@RequestBody UserDTO userDTO) {
        try {
            userService.save(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseUtil(201, "User registered successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseUtil(500, e.getMessage(), null));
        }

    }
}
