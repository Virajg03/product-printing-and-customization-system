package com.project.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.exception.ProductException;
import com.project.model.Product;
import com.project.model.Review;
import com.project.model.User;
import com.project.repository.ProductRepository;
import com.project.repository.ReviewRepository;
import com.project.request.ReviewRequest;

@Service
public class ReviewServiceImplementation implements ReviewService{

	@Autowired
	private ReviewRepository reviewRepository;
	@Autowired
	private ProductService productService;
	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public Review createReview(ReviewRequest req, User user) throws ProductException {
		Product product = productService.findProductById(req.getProductId()); 
		
		Review review = new Review();
		review.setReview(req.getReview());
		review.setProduct(product);
		review.setUser(user);
		review.setCreatedAt(LocalDateTime.now());
		

		
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getAllReview(Long ProductId) {
		
		return reviewRepository.getAllProductsReview(ProductId);
	}

}
