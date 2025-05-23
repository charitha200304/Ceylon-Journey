package com.example.travel_agency.repository;

import com.example.travel_agency.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findByRole(String role);

    Optional<User> findByUsername(String username);


}
