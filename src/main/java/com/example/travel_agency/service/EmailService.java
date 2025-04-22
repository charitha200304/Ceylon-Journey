package com.example.travel_agency.service;

public interface EmailService {
    void sendBookingConfirmationEmail(String to, String subject,String body);
}