package com.example.travel_agency.service;

import com.example.travel_agency.dto.BookingDTO;
import com.example.travel_agency.entity.Booking;

import java.util.List;

public interface BookingService {
    void save(BookingDTO bookingDTO);
    void save(Booking booking);
    void delete(Long id);
    void update(Long id, BookingDTO bookingDTO);
    List<BookingDTO> getAll();
    List<BookingDTO> getByUserId(Long userId);
}