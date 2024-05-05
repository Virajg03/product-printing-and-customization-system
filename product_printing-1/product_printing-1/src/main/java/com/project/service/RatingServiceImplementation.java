package com.project.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.exception.ProductException;
import com.project.model.Product;
import com.project.model.Rating;
import com.project.model.User;
import com.project.repository.RatingRepository;
import com.project.request.RatingRequest;

@Service
public class RatingServiceImplementation implements RatingService{

	@Autowired
	private RatingRepository ratingRepository;
	@Autowired
	private ProductService productService;
	
	
	
	@Override
	public Rating createRating(RatingRequest req, User user) throws ProductException {
		Product product = productService.findProductById(req.getProductId());
		
		Rating rating = new Rating();
		rating.setUser(user);
		rating.setProduct(product);
		rating.setRating(req.getRating());
		rating.setCreatedAt(LocalDateTime.now());
		
		return ratingRepository.save(rating);
	}

	@Override
	public List<Rating> getProductsRating(Long productId) {
		
		return ratingRepository.getAllProductRating(productId);
	}

}
