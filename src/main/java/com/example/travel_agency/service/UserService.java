package com.example.travel_agency.service;

import com.example.travel_agency.dto.AuthTokenDTO;
import com.example.travel_agency.dto.UserDTO;
import com.example.travel_agency.dto.UserLoginDTO;

import java.util.List;

public interface UserService {
    void save(UserDTO userDTO);
    UserDTO findByEmail(String email);
    void update(UserDTO userDTO);
    void delete(Long id);
    UserDTO getUserById(Long id);
    List<UserDTO> getAllUsers();
    List<UserDTO> getUsersByRole(String role);
    UserDTO getUserByEmail(String email);
    AuthTokenDTO verifyUser(UserLoginDTO userDTO);
}
