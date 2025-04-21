package com.example.travel_agency.service.impl;

import com.example.travel_agency.dto.ReviewDTO;
import com.example.travel_agency.entity.Review;
import com.example.travel_agency.entity.User;
import com.example.travel_agency.repository.ReviewRepo;
import com.example.travel_agency.repository.UsersRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void save(ReviewDTO reviewDTO) {
        Review review = modelMapper.map(reviewDTO, Review.class);

        // Validate User
        Optional<User> optUser = usersRepo.findById(reviewDTO.getUserId());
        if (optUser.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + reviewDTO.getUserId());
        }

        // Set User reference
        review.setUser(optUser.get());

        reviewRepo.save(review);
    }

    @Override
    public void update(ReviewDTO reviewDTO) {
        Optional<Review> optReview = reviewRepo.findById(reviewDTO.getId());
        if (optReview.isEmpty()) {
            throw new RuntimeException("Review not found with ID: " + reviewDTO.getId());
        }

        Review review = modelMapper.map(reviewDTO, Review.class);

        // Validate User
        Optional<User> optUser = usersRepo.findById(reviewDTO.getUserId());
        if (optUser.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + reviewDTO.getUserId());
        }

        review.setUser(optUser.get());

        reviewRepo.save(review);
    }

    @Override
    public void delete(Long id) {
        if (!reviewRepo.existsById(id)) {
            throw new RuntimeException("Review not found with ID: " + id);
        }
        reviewRepo.deleteById(id);
    }

    @Override
    public ReviewDTO getReviewById(Long id) {
        Optional<Review> review = reviewRepo.findById(id);
        if (review.isEmpty()) {
            throw new RuntimeException("Review not found with ID: " + id);
        }
        return modelMapper.map(review.get(), ReviewDTO.class);
    }

    @Override
    public List<ReviewDTO> getAllReviews() {
        List<Review> reviews = reviewRepo.findAll();
        return reviews.stream()
                .map(review -> modelMapper.map(review, ReviewDTO.class))
                .toList();
    }

    @Override
    public List<ReviewDTO> getReviewsByUserId(Long userId) {
        List<Review> reviews = reviewRepo.findByUserId(userId);
        return reviews.stream()
                .map(review -> modelMapper.map(review, ReviewDTO.class))
                .toList();
    }
}
