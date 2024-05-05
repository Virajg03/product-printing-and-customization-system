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
import com.project.responce.ApiResponce;
import com.project.request.CreateProductRequest;
import com.project.service.CustomizedProductService;

@RestController
@RequestMapping("/api/admin/customized/products")
public class AdminCustomizedProductController {

	@Autowired(required = true)
	private CustomizedProductService customizedProductService;

	

	@PostMapping("/")
	public ResponseEntity<CustomizedProduct> createProduct(@RequestBody CreateProductRequest req) {

		CustomizedProduct product = customizedProductService.createProduct(req);

		return new ResponseEntity<CustomizedProduct>(product, HttpStatus.CREATED);
	}

	@GetMapping("/all")
	public ResponseEntity<List<CustomizedProduct>> findAllProduct() {
		List<CustomizedProduct> products = customizedProductService.findAllProducts();

		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	@DeleteMapping("/{productId}/delete")
	public ResponseEntity<ApiResponce> deleteProduct(@PathVariable Long productId) throws ProductException {

		customizedProductService.deleteProduct(productId);

		ApiResponce res = new ApiResponce();

		res.setMessage("product deleted successfully");
		res.setStatus(true);

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PutMapping("/{productId}/update")
	public ResponseEntity<CustomizedProduct> updateProduct(@RequestBody Product req, @PathVariable Long ProductId)
			throws ProductException {

		CustomizedProduct product = customizedProductService.updateProduct(ProductId, req);
		return new ResponseEntity<CustomizedProduct>(product, HttpStatus.CREATED);
	}

	@PostMapping("/creates")
	public ResponseEntity<ApiResponce> createMultipleProduct(@RequestBody CreateProductRequest[] req) {

		for (CreateProductRequest product : req) {
			customizedProductService.createProduct(product);
		}

		ApiResponce res = new ApiResponce();
		res.setMessage("Order created successfully..");
		res.setStatus(true);

		return new ResponseEntity<>(HttpStatus.CREATED);

	}

}
