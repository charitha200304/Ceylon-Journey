package com.example.travel_agency.controller;

import com.example.travel_agency.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
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

    // ✅ Public: Register new user
    @PostMapping("/addUser")
    public ResponseEntity<ResponseUtil> addUser(@Valid @RequestBody UserDTO userDTO) {


        try {
            userService.save(userDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseUtil(HttpStatus.CREATED.value(), "User added successfully", null));
        } catch (DuplicateEmailException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseUtil(HttpStatus.CONFLICT.value(), e.getMessage(), null));
        } catch (Exception e) {
            logger.error("Error adding user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Something went wrong", null));
        }
    }

    // ✅ Public: Get logged-in user from token
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
            logger.error("Error getting user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error retrieving user", null));
        }
    }

    // ✅ Admin: Get user by ID
    @GetMapping("/getById/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseUtil> getUserById(@PathVariable Long id) {
        UserDTO userDTO = userService.getUserById(id);
        return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "User fetched successfully", userDTO));
    }

    // ✅ Admin: Get all users
    @GetMapping("/getAll")
    public ResponseEntity<ResponseUtil> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "Users fetched successfully", users));
    }

    // ✅ Admin: Get users by role
    @GetMapping("/getByRole/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseUtil> getUsersByRole(@PathVariable String role) {
        List<UserDTO> users = userService.getUsersByRole(role);
        return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "Users fetched successfully", users));
    }

    // ✅ Admin: Get user by email
    @GetMapping("/getByEmail/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseUtil> getUserByEmail(@PathVariable String email) {
        UserDTO userDTO = userService.getUserByEmail(email);
        return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "User fetched successfully", userDTO));
    }

    // ✅ User/Admin: Update user
    @PutMapping("/updateUser")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<ResponseUtil> updateUser(@Valid @RequestBody UserDTO userDTO) {
        userService.update(userDTO);
        return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "User updated successfully", null));
    }

    // ✅ Admin: Delete user
    @DeleteMapping("/deleteUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseUtil> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok(new ResponseUtil(HttpStatus.OK.value(), "User deleted successfully", null));
    }
}
