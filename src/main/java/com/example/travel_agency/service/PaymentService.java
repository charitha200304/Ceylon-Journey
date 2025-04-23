package com.example.travel_agency.service;

import com.example.travel_agency.dto.PaymentDTO;

import java.util.List;

public interface PaymentService {

    PaymentDTO savePayment(PaymentDTO paymentDTO);

    PaymentDTO getPaymentById(Long id);

    List<PaymentDTO> getAllPayments();

    void deletePayment(Long id);
}