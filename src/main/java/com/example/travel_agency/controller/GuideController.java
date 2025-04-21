package com.example.travel_agency.controller;

import com.example.travel_agency.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

    private final GuideService guideService;

    public GuideController(GuideService guideService) {
        this.guideService = guideService;
    }

    // Get guide by ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<ResponseUtil> getGuideById(@PathVariable Long id) {
        try {
            GuideDTO guideDTO = guideService.getGuideById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseUtil(200, "Guide fetched successfully", guideDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseUtil(500, e.getMessage(), null));
        }
    }

    // Get all guides
    @GetMapping("/getAll")
    public ResponseEntity<ResponseUtil> getAllGuides() {
        try {
            List<GuideDTO> guides = guideService.getAllGuides();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseUtil(200, "Guides fetched successfully", guides));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseUtil(500, e.getMessage(), null));
        }
    }

    // Add a new guide
    @PostMapping("/addGuide")
    public ResponseEntity<ResponseUtil> addGuide(@RequestBody GuideDTO guideDTO) {
        try {
            guideService.save(guideDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseUtil(201, "Guide added successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseUtil(500, e.getMessage(), null));
        }
    }

    // Update guide
    @PutMapping("/updateGuide")
    public ResponseEntity<ResponseUtil> updateGuide(@RequestBody GuideDTO guideDTO) {
        try {
            guideService.update(guideDTO);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseUtil(200, "Guide updated successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseUtil(500, e.getMessage(), null));
        }
    }

    // Delete guide
    @DeleteMapping("/deleteGuide/{id}")
    public ResponseEntity<ResponseUtil> deleteGuide(@PathVariable Long id) {
        try {
            guideService.delete(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseUtil(200, "Guide deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseUtil(500, e.getMessage(), null));
        }
    }
}
