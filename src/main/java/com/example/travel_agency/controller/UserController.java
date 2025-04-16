package com.example.travel_agency.controller;

import com.example.travel_agency.dto.UserDTO;
import com.example.travel_agency.service.JWTService;
import com.example.travel_agency.service.UserService;
import com.example.travel_agency.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService, JWTService jwtService, UserDetailsService userDetailsService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/getUser")
    public ResponseEntity<ResponseUtil> getUser(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ResponseUtil(HttpStatus.UNAUTHORIZED.value(), "Missing or invalid authorization header", null));
            }

            String token = authHeader.substring(7);
            String username = jwtService.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (!jwtService.validateToken(token, userDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ResponseUtil(HttpStatus.UNAUTHORIZED.value(), "Invalid or expired token", null));
            }

            UserDTO userDTO = userService.getUserByEmail(username);

            if (userDTO == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ResponseUtil(HttpStatus.NOT_FOUND.value(), "User not found", null));
            }

            return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "User fetched successfully", userDTO));
        } catch (Exception e) {
            logger.error("Error fetching user: ", e);
            return handleException(e);
        }
    }

    @GetMapping("/getById/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseUtil> getUserById(@PathVariable Long id) {
        try {
            UserDTO userDTO = userService.getUserById(id);
            return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "User fetched successfully", userDTO));
        } catch (Exception e) {
            logger.error("Error fetching user by ID: ", e);
            return handleException(e);
        }
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseUtil> getAllUsers() {
        try {
            List<UserDTO> users = userService.getAllUsers();
            return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "Users fetched successfully", users));
        } catch (Exception e) {
            logger.error("Error fetching all users: ", e);
            return handleException(e);
        }
    }

    @GetMapping("/getByRole/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseUtil> getUsersByRole(@PathVariable String role) {
        try {
            List<UserDTO> users = userService.getUsersByRole(role);
            return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "Users fetched successfully", users));
        } catch (Exception e) {
            logger.error("Error fetching users by role: ", e);
            return handleException(e);
        }
    }

    @GetMapping("/getByEmail/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseUtil> getUserByEmail(@PathVariable String email) {
        try {
            UserDTO userDTO = userService.getUserByEmail(email);
            return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "User fetched successfully", userDTO));
        } catch (Exception e) {
            logger.error("Error fetching user by email: ", e);
            return handleException(e);
        }
    }

    @PostMapping("/addUser")
    public ResponseEntity<ResponseUtil> addUser(@Valid @RequestBody UserDTO userDTO) {
        try {
            userService.save(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseUtil(HttpStatus.CREATED.value(), "User added successfully", null));
        } catch (Exception e) {
            logger.error("Error adding user: ", e);
            return handleException(e);
        }
    }

    @PutMapping("/updateUser")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<ResponseUtil> updateUser(@Valid @RequestBody UserDTO userDTO) {
        try {
            userService.update(userDTO);
            return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "User updated successfully", null));
        } catch (Exception e) {
            logger.error("Error updating user: ", e);
            return handleException(e);
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseUtil> deleteUser(@PathVariable Long id) {
        try {
            userService.delete(id);
            return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "User deleted successfully", null));
        } catch (Exception e) {
            logger.error("Error deleting user: ", e);
            return handleException(e);
        }
    }

    private ResponseEntity<ResponseUtil> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "An error occurred: " + e.getMessage(), null));
    }
}
