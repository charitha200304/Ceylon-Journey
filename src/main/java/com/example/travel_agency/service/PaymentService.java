package com.example.travel_agency.service;

import com.example.travel_agency.dto.PaymentDTO;

import java.util.List;

public interface PaymentService {
    void save(PaymentDTO paymentDTO);
    void update(PaymentDTO paymentDTO);
    void delete(Long id);
    PaymentDTO getPaymentById(Long id);
    List<PaymentDTO> getAllPayments();
    List<PaymentDTO> getPaymentsByUserId(Long userId);
}
