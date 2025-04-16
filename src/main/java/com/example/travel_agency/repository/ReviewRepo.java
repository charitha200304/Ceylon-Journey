package com.example.travel_agency.repository;

import com.example.travel_agency.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {
    List<Review> findByEntityTypeAndEntityId(String entityType, Long entityId);

    List<Review> findByUserId(Long userId);
}
