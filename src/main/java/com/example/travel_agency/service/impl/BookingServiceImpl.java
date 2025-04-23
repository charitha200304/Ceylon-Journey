package com.example.travel_agency.service.impl;

import com.example.travel_agency.dto.BookingDTO;
import com.example.travel_agency.dto.UserDTO;
import com.example.travel_agency.entity.Booking;
import com.example.travel_agency.entity.Hotel;
import com.example.travel_agency.entity.TravelPackages;
import com.example.travel_agency.entity.User;
import com.example.travel_agency.repository.BookingRepo;
import com.example.travel_agency.repository.HotelRepo;
import com.example.travel_agency.repository.TravelPackagesRepo;
import com.example.travel_agency.repository.UsersRepo;
import com.example.travel_agency.service.BookingService;
import com.example.travel_agency.service.EmailService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepo bookingRepository;

    @Autowired
    private UsersRepo userRepository;

    @Autowired
    private TravelPackagesRepo travelPackageRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private EmailService emailService;

    private static final Logger logger = Logger.getLogger(BookingServiceImpl.class.getName());

    @Override
    public void save(BookingDTO bookingDTO) {
        System.out.println("save booking");

        TravelPackages travelPackage = modelMapper.map(bookingDTO.getTravelPackage(), TravelPackages.class);
        User user = modelMapper.map(bookingDTO.getUser(), User.class);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTravelPackage(travelPackage);
        booking.setStatus(bookingDTO.getStatus());
        booking.setAdditionalRequests(bookingDTO.getAdditionalRequests());
        booking.setNumberOfGuests(bookingDTO.getNumberOfGuests());
        booking.setTravelDate(bookingDTO.getTravelDate());
        booking.setUserEmail(bookingDTO.getUserEmail());
        booking.setUserName(bookingDTO.getUser().getUsername());

        bookingRepository.save(booking);
    }

    @Override
    public List<BookingDTO> getAll() {
        List<Booking> bookings = bookingRepository.findAll();

        List<BookingDTO> bots = new ArrayList<>();
        for (Booking booking : bookings) {
            BookingDTO bookingDTO = new BookingDTO();
            bookingDTO.setId(booking.getId());
            bookingDTO.setPackageName(booking.getTravelPackage().getName());
            bookingDTO.setStatus(booking.getStatus());
            bookingDTO.setAdditionalRequests(booking.getAdditionalRequests());
            bookingDTO.setNumberOfGuests(booking.getNumberOfGuests());
            bookingDTO.setTravelDate(booking.getTravelDate());
            bookingDTO.setUserEmail(booking.getUserEmail());
            bookingDTO.setUser(modelMapper.map(booking.getUser(), UserDTO.class));
            bots.add(bookingDTO);
        }
        return bots;
    }

    @Override
    public void save(Booking booking) {
        bookingRepository.save(booking);
    }

    @Override
    public List<BookingDTO> getByUserId(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        Type listType = new TypeToken<List<BookingDTO>>() {
        }.getType();
        return modelMapper.map(bookings, listType);
    }

    @Override
    public void delete(Long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public void update(Long id, BookingDTO bookingDTO) {
        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found."));

        existingBooking.setStatus(Booking.BookingStatus.valueOf(String.valueOf(bookingDTO.getStatus())));

        bookingRepository.save(existingBooking);
    }
}