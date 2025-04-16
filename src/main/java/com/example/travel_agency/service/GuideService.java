package com.example.travel_agency.service;

import com.example.travel_agency.dto.GuideDTO;

import java.util.List;

public interface GuideService {
    void save(GuideDTO guideDTO);
    void update(GuideDTO guideDTO);
    void delete(Long id);
    GuideDTO getGuideById(Long id);
    List<GuideDTO> getAllGuides();
}
