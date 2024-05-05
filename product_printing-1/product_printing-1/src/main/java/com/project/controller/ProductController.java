package com.project.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.exception.ProductException;
import com.project.model.Product;
import com.project.service.ProductService;

@RestController
@RequestMapping("/api")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	
	@GetMapping("/products")
	public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String category,
			@RequestParam List<String> color,@RequestParam List<String> size,@RequestParam Integer 	minPrice,
			@RequestParam Integer maxPrice , @RequestParam Integer minDiscount, @RequestParam String sort,
			@RequestParam String stock, @RequestParam Integer pageNumber,@RequestParam Integer PageSize){
		
		
		Page<Product> res = productService.getAllProduct(category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, PageSize);
		
		System.out.println("Complete proucts");	
		
		return new ResponseEntity<>(res,HttpStatus.ACCEPTED); 
		
	}
	
	
	@GetMapping("/products/id/{productId}")
	public ResponseEntity<Product> findProductByHandler(@PathVariable Long productId)throws ProductException{
		
		Product product = productService.findProductById(productId);
		
		return new ResponseEntity<>(product,HttpStatus.ACCEPTED); 
		
	}
	
	
	
}
