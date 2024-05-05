package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.model.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long>{

	@Query("SELECT r FROM Rating r WHERE r.product.id = :productId")

	public List<Rating> getAllProductRating(@Param("productId") Long productId);
	
}
