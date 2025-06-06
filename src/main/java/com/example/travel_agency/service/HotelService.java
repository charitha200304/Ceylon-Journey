package com.example.travel_agency.service;

import com.example.travel_agency.dto.HotelDTO;

import java.util.List;

public interface HotelService {
    void save(HotelDTO hotelDTO);
    void update(HotelDTO hotelDTO);
    void delete(Long id);
    HotelDTO getHotelById(Long id);
    List<HotelDTO> getAllHotels();
}
