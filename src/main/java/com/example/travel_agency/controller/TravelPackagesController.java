package com.example.travel_agency.controller;

import com.example.travel_agency.dto.TravelPackagesDTO;
import com.example.travel_agency.service.TravelPackagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/travel-packages")
@CrossOrigin(origins = "http://localhost:63342") // Adjust as needed for frontend
public class TravelPackagesController {

    @Autowired
    private TravelPackagesService travelPackagesService;

    @PostMapping("/add")
    public ResponseEntity<?> addTravelPackage(@RequestBody TravelPackagesDTO travelPackageDTO) {
        travelPackagesService.save(travelPackageDTO);
        return ResponseEntity.ok().body("{\"message\": \"Travel package added successfully\"}");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTravelPackage(@RequestBody TravelPackagesDTO travelPackageDTO) {
        travelPackagesService.update(travelPackageDTO);
        return ResponseEntity.ok().body("{\"message\": \"Travel package updated successfully\"}");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTravelPackage(@PathVariable Long id) {
        travelPackagesService.delete(id);
        return ResponseEntity.ok().body("{\"message\": \"Travel package deleted successfully\"}");
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<TravelPackagesDTO> getTravelPackageById(@PathVariable Long id) {
        return ResponseEntity.ok(travelPackagesService.getTravelPackageById(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<TravelPackagesDTO>> getAllTravelPackages() {
        return ResponseEntity.ok(travelPackagesService.getAllTravelPackages());
    }

    @GetMapping("/filterByBudget")
    public ResponseEntity<List<TravelPackagesDTO>> getTravelPackagesByBudget(
            @RequestParam Double min,
            @RequestParam Double max) {
        return ResponseEntity.ok(travelPackagesService.getTravelPackagesByBudget(min, max));
    }
}
