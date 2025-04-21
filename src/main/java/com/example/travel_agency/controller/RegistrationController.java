package com.example.travel_agency.controller;

import com.example.travel_agency.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "*")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @PostMapping("/user")
    public ResponseEntity<ResponseUtil> registerUser(@RequestBody UserDTO userDTO) {
        try {
            System.out.println("Received registration: " + userDTO);
            userService.save(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseUtil(201, "User registered successfully", null));
        } catch (Exception e) {
            e.printStackTrace(); // ✅ Add this
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseUtil(500, e.getMessage(), null));
        }
    }

}
