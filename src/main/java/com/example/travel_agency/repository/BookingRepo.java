package com.example.travel_agency.repository;

import com.example.travel_agency.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {

    List<Booking> findByTravelPackageId(Long travelPackageId);

    List<Booking> findByUserId(Long userId);
}