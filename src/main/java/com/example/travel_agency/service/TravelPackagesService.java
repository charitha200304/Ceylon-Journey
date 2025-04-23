package com.example.travel_agency.service;

import com.example.travel_agency.dto.TravelPackagesDTO;

import java.util.List;

public interface TravelPackagesService {
    TravelPackagesDTO getPackageByName(Long id);
    void save(TravelPackagesDTO travelPackageDTO);
    void update(TravelPackagesDTO travelPackageDTO);
    void delete(Long id);
    TravelPackagesDTO getTravelPackageById(Long id);
    List<TravelPackagesDTO> getAllTravelPackages();
    List<TravelPackagesDTO> getTravelPackagesByBudget(Double minBudget, Double maxBudget);
}
