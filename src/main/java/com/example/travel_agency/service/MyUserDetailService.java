package com.example.travel_agency.service;

import com.example.travel_agency.entity.User;
import com.example.travel_agency.repository.UsersRepo;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailService implements UserDetailsService {

    private final UsersRepo userRepo;

    public MyUserDetailService(UsersRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findByUsername(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(
                user.get().getUsername(),
                user.get().getPassword(), // Assuming password in DB is already encoded
                AuthorityUtils.createAuthorityList("ROLE_" + user.get().getRole()) // Add ROLE_ prefix
        );
    }

}