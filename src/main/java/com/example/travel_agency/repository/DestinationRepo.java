package com.example.travel_agency.repository;

import com.example.travel_agency.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DestinationRepo extends JpaRepository<Destination, Long> {
    List<Destination> findByCateogary(String category);
}
