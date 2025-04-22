package com.example.travel_agency.repository;

import com.example.travel_agency.entity.TravelPackages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TravelPackagesRepo extends JpaRepository<TravelPackages, Long> {
    List<TravelPackages> findByBudgetBetween(Double minBudget, Double maxBudget);
    TravelPackages findByName(String name);
}
