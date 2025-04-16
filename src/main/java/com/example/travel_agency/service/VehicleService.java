package com.example.travel_agency.service;

import com.example.travel_agency.dto.VehicleDTO;

import java.util.List;

public interface VehicleService {
    void save(VehicleDTO vehicleDTO);
    void update(VehicleDTO vehicleDTO);
    void delete(Long id);
    VehicleDTO getVehicleById(Long id);
    List<VehicleDTO> getAllVehicles();
    List<VehicleDTO> getVehiclesByType(String type);
    List<VehicleDTO> getVehiclesByCapacity(int minCapacity);
}
