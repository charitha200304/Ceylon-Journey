package com.example.travel_agency.repository;

import com.example.travel_agency.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
    List<Payment> findByUserId(Long userId);
}
