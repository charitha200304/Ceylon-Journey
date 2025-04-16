package com.example.travel_agency.service;


import com.example.travel_agency.dto.DestinationDTO;

import java.util.List;

public interface DestinationService {

    void save(DestinationDTO destinationDTO);
    void update(DestinationDTO destinationDTO);
    void delete(Long id);
    List<DestinationDTO> getAllDestinations();
    DestinationDTO getDestinationById(Long id);

}
