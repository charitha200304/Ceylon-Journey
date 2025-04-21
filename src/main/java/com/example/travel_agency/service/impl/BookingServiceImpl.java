package com.example.travel_agency.service.impl;

import com.example.travel_agency.dto.BookingDTO;
import com.example.travel_agency.entity.Booking;
import com.example.travel_agency.entity.Hotel;
import com.example.travel_agency.entity.User;
import com.example.travel_agency.repository.BookingRepo;
import com.example.travel_agency.repository.HotelRepo;
import com.example.travel_agency.repository.UsersRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private HotelRepo hotelRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void save(BookingDTO bookingDTO) {
        Booking booking = modelMapper.map(bookingDTO, Booking.class);


        Optional<User> optUser = usersRepo.findById(bookingDTO.getUserId());
        if (optUser.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + bookingDTO.getUserId());
        }


        Optional<Hotel> optHotel = hotelRepo.findById(bookingDTO.getHotelId());
        if (optHotel.isEmpty()) {
            throw new RuntimeException("Hotel not found with ID: " + bookingDTO.getHotelId());
        }


        booking.setUser(optUser.get());
        booking.setHotel(optHotel.get());

        bookingRepo.save(booking);
    }

    @Override
    public void update(BookingDTO bookingDTO) {
        Optional<Booking> optBooking = bookingRepo.findById(bookingDTO.getId());
        if (optBooking.isEmpty()) {
            throw new RuntimeException("Booking not found with ID: " + bookingDTO.getId());
        }

        Booking booking = modelMapper.map(bookingDTO, Booking.class);


        Optional<User> optUser = usersRepo.findById(bookingDTO.getUserId());
        if (optUser.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + bookingDTO.getUserId());
        }


        Optional<Hotel> optHotel = hotelRepo.findById(bookingDTO.getHotelId());
        if (optHotel.isEmpty()) {
            throw new RuntimeException("Hotel not found with ID: " + bookingDTO.getHotelId());
        }

        booking.setUser(optUser.get());
        booking.setHotel(optHotel.get());

        bookingRepo.save(booking);
    }

    @Override
    public void delete(Long id) {
        if (!bookingRepo.existsById(id)) {
            throw new RuntimeException("Booking not found with ID: " + id);
        }
        bookingRepo.deleteById(id);
    }

    @Override
    public BookingDTO getBookingById(Long id) {
        Optional<Booking> booking = bookingRepo.findById(id);
        if (booking.isEmpty()) {
            throw new RuntimeException("Booking not found with ID: " + id);
        }
        return modelMapper.map(booking.get(), BookingDTO.class);
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        List<Booking> bookings = bookingRepo.findAll();
        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingDTO.class))
                .toList();
    }

    @Override
    public List<BookingDTO> getBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingRepo.findByUserId(userId);
        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingDTO.class))
                .toList();
    }
}
