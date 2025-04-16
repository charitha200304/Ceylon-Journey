package com.example.travel_agency.service;

import com.example.travel_agency.dto.BookingDTO;

import java.util.List;

public interface BookingService {
    void save(BookingDTO bookingDTO);
    void update(BookingDTO bookingDTO);
    void delete(Long id);
    BookingDTO getBookingById(Long id);
    List<BookingDTO> getAllBookings();
    List<BookingDTO> getBookingsByUserId(Long userId);
}
