package com.project.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.project.exception.ProductException;
import com.project.model.Product;
import com.project.request.CreateProductRequest;

public interface ProductService {
	
	public Product createProduct(CreateProductRequest req );
	
	public String deleteProduct(Long productId) throws ProductException;
	
	public Product updateProdect(Long productId,Product req)throws ProductException;
	
	public Product findProductById(Long id)throws ProductException;
	
	public List<Product> findProductByCategory(String category);
	
	public Page<Product> getAllProduct (String category, List<String> color,List<String> sizes,Integer minPrice,Integer maxPrice,
			Integer minDiscount,String sort,String stock,Integer pageNumber,Integer PageSize);


	public List<Product> recentlyAddedProduct();
	
	//////////////////////////////////////
	
	public List<Product> findAllProducts();

	
}
