package com.example.travel_agency.service.impl;

import com.example.travel_agency.dto.AuthTokenDTO;
import com.example.travel_agency.dto.UserDTO;
import com.example.travel_agency.dto.UserLoginDTO;
import com.example.travel_agency.entity.User;
import com.example.travel_agency.repository.UsersRepo;
import com.example.travel_agency.service.JWTService;
import com.example.travel_agency.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void save(UserDTO userDTO) {
        if (userDTO == null) {
            throw new IllegalArgumentException("UserDTO is null");
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // ✅ Hash password
        user.setRole(userDTO.getRole());

        System.out.println("Saving user: " + user.getUsername()); // ✅ Debug log

        userRepo.save(user);
    }

    @Override
    public void update(UserDTO userDTO) {
        Optional<User> optUser = userRepo.findById(userDTO.getId());
        if (optUser.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + userDTO.getId());
        }

        User user = optUser.get(); // Get the User object from Optional
        //Only update the fields that are provided in the DTO.
        if(userDTO.getUsername() != null){
            user.setUsername(userDTO.getUsername());
        }
        if(userDTO.getEmail() != null){
            user.setEmail(userDTO.getEmail());
        }
        if(userDTO.getPassword() != null){
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        if(userDTO.getRole() != null){
            user.setRole(userDTO.getRole());
        }
        userRepo.save(user);
    }

    @Override
    public void delete(Long id) {
        if (!userRepo.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        userRepo.deleteById(id);
    }

    @Override
    public UserDTO getUserById(Long id) {
        Optional<User> user = userRepo.findById(id);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        return modelMapper.map(user.get(), UserDTO.class);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList()); // Use collect(Collectors.toList())
    }

    @Override
    public List<UserDTO> getUsersByRole(String role) {
        List<User> users = userRepo.findByRole(role);
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        Optional<User> user = userRepo.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return modelMapper.map(user.get(), UserDTO.class);
    }

    @Transactional
    @Override
    public AuthTokenDTO verifyUser(UserLoginDTO userDTO) {
        Optional<User> optionalUser = userRepo.findByUsername(userDTO.getUsername());

        AuthTokenDTO authTokenDTO = new AuthTokenDTO();

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
                authTokenDTO.setAuthenticated(false);
                authTokenDTO.setMessage("Invalid credentials");
                return authTokenDTO;
            }
            try {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword())
                );

                if (authentication.isAuthenticated()) {
                    authTokenDTO.setAuthenticated(true);
                    authTokenDTO.setToken(jwtService.generateToken(user.getUsername()));
                    authTokenDTO.setMessage("Success");
                    return authTokenDTO;
                }
            } catch (UsernameNotFoundException e) {
                authTokenDTO.setAuthenticated(false);
                authTokenDTO.setMessage("User not found");
                return authTokenDTO;
            }


            authTokenDTO.setAuthenticated(false);
            authTokenDTO.setMessage("Invalid credentials");
            return authTokenDTO;
        }

        authTokenDTO.setAuthenticated(false);
        authTokenDTO.setMessage("User not found");
        return authTokenDTO;
    }
}
