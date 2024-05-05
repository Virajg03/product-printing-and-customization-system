package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.exception.ProductException;
import com.project.model.CustomizedProduct;
import com.project.model.Product;
import com.project.request.CreateProductRequest;
import com.project.responce.ApiResponce;
import com.project.service.CustomizedProductService;
import com.project.service.ProductService;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

	@Autowired
	private ProductService productService;
	
	@Autowired
	private CustomizedProductService customizedProductService;
	
	
	@PostMapping("/")
	public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest req){
		
		Product product = productService.createProduct(req);
		
		return new ResponseEntity<Product>(product,HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Product>> findAllProduct(){
		List<Product> products = productService.findAllProducts();
		
		return new ResponseEntity<> (products,HttpStatus.OK);
	}
	
	
	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponce> deleteProduct(@PathVariable Long productId) throws ProductException{
		
		productService.deleteProduct(productId);
		
		ApiResponce res = new ApiResponce();
		
		res.setMessage("product deleted successfully");
		res.setStatus(true);		
		
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
	
	@DeleteMapping("/customized/{productId}/delete")
	public ResponseEntity<ApiResponce> deleteCustomizedProduct(@PathVariable Long productId) throws ProductException{
		
		customizedProductService.deleteProduct(productId);
		
		ApiResponce res = new ApiResponce();
		
		res.setMessage("product deleted successfully");
		res.setStatus(true);		
		
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
	
	
	@PutMapping("/{productId}/update")
	public ResponseEntity<Product> updateProduct(@RequestBody Product req,@PathVariable Long ProductId)throws ProductException {
	
		Product product = productService.updateProdect(ProductId, req);
		return new ResponseEntity<Product>(product,HttpStatus.CREATED);
	}
	
	
	@PostMapping("/creates")
	public ResponseEntity<ApiResponce> createMultipleProduct(@RequestBody CreateProductRequest[] req){
		
		for(CreateProductRequest product : req) {
			productService.createProduct(product);
		}
		
		
		ApiResponce res = new ApiResponce();
		res.setMessage("Order created successfully..");
		res.setStatus(true);
		
		return new ResponseEntity<>(HttpStatus.CREATED);
		
		
	}
	
	@GetMapping("/recent")
	public ResponseEntity<List<Product>> recentlyAddedProduct(){
		
		List<Product> products = productService.recentlyAddedProduct();
		
		return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
	}
	
	@GetMapping("/recente")
	public ResponseEntity<List<CustomizedProduct>> recentlyAddedCustomizedProduct(){
		
		List<CustomizedProduct> products = customizedProductService.recentlyAddedProduct();
		
		return new ResponseEntity<List<CustomizedProduct>>(products,HttpStatus.OK);
	}
	
	
}
