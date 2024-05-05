package com.project.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.project.exception.ProductException;
import com.project.model.CustomizedProduct;
import com.project.model.Product;
import com.project.request.CreateProductRequest;

public interface CustomizedProductService {
	
	
	public CustomizedProduct createProduct(CreateProductRequest req);

	public String deleteProduct(Long productId) throws ProductException;

	public CustomizedProduct updateProduct(Long productId, Product req) throws ProductException;

	public CustomizedProduct findProductById(Long id) throws ProductException;

	public List<CustomizedProduct> findProductByCategory(String category);

	public Page<CustomizedProduct> getAllProduct(String category, List<String> color, List<String> sizes,
			Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber,
			Integer PageSize);

//////////////////////////////////////

	public List<CustomizedProduct> findAllProducts();

	public List<CustomizedProduct> recentlyAddedProduct();
}
