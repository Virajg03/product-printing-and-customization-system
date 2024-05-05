package com.project.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.exception.ProductException;
import com.project.model.Category;
import com.project.model.CustomizedProduct;
import com.project.model.Product;
import com.project.repository.CategoryRepository;
import com.project.repository.CustomizedProductRepository;
import com.project.repository.DesignRepository;
import com.project.request.CreateProductRequest;

@Service
public class CustomizedProductServiceImplementation implements CustomizedProductService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private CustomizedProductRepository customizedProductRepository;
	
	@Autowired
	private DesignRepository designRepository;

	@Override
	public CustomizedProduct createProduct(CreateProductRequest req) {

		// toplevel
		Category topLevel = categoryRepository.findByName(req.getTopLavelCategory());
		if (topLevel == null) {
			Category topLevelCategory = new Category();
			topLevelCategory.setName(req.getTopLavelCategory());
			topLevelCategory.setLevel(1);

			topLevel = categoryRepository.save(topLevelCategory);
		}

		// secondlevel
		Category secondLevel = categoryRepository.findByNameAndParant(req.getTopLavelCategory(), topLevel.getName());
		if (secondLevel == null) {
			Category secondLevelCategory = new Category();
			secondLevelCategory.setName(req.getSecondLavelCategory());
			secondLevelCategory.setParentCategory(topLevel);
			secondLevelCategory.setLevel(2);

			secondLevel = categoryRepository.save(secondLevelCategory);
		}

		// thirdlevel
		Category thirdLevel = categoryRepository.findByNameAndParant(req.getTopLavelCategory(), secondLevel.getName());
		if (thirdLevel == null) {
			Category thirdLevelCategory = new Category();
			thirdLevelCategory.setName(req.getThirdLavelCategory());
			thirdLevelCategory.setParentCategory(secondLevel);
			thirdLevelCategory.setLevel(3);

			thirdLevel = categoryRepository.save(thirdLevelCategory);
		}

		CustomizedProduct product = new CustomizedProduct();
		product.setTitle(req.getTitle());
		product.setColor(req.getColor());
		product.setDescription(req.getDescription());
		product.setDiscountedPrice(req.getDiscountedPrice());
		product.setDiscountPersent(req.getDiscountPersent());
		product.setImageUrl(req.getImageUrl());
		product.setBrand(req.getBrand());
		product.setPrice(req.getPrice());
		product.setSizes(req.getSize());
		product.setQuantity(req.getQuantity());
		product.setCategory(thirdLevel);
		product.setCreatAt(LocalDateTime.now());

		CustomizedProduct saveProduct = customizedProductRepository.save(product);

		return saveProduct;

	}

	@Override
	public String deleteProduct(Long productId) throws ProductException {
		CustomizedProduct product = findProductById(productId);
		product.getSizes().clear();
		
//		Long id = product.getDesign().getId();
//		
//		designRepository.deleteById(id);
		
		customizedProductRepository.delete(product);

		return "Product deleted Successfully";
	}

	@Override
	public CustomizedProduct updateProduct(Long productId, Product req) throws ProductException {
		CustomizedProduct product1 = findProductById(productId);

		if (req.getQuantity() != 0) {
			product1.setQuantity(req.getQuantity());
		}
		return customizedProductRepository.save(product1);
	}

	@Override
	public CustomizedProduct findProductById(Long id) throws ProductException {
		Optional<CustomizedProduct> opt = customizedProductRepository.findById(id);

		if (opt.isPresent()) {
			return opt.get();
		}
		throw new ProductException("Customize Product Not Found By Id : " + id);
	}

	@Override
	public List<CustomizedProduct> findProductByCategory(String category) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<CustomizedProduct> getAllProduct(String category, List<String> color, List<String> sizes,
			Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber,
			Integer PageSize) {
		
		Pageable pageable = PageRequest.of(pageNumber, PageSize);

		List<CustomizedProduct> customizedProducts = customizedProductRepository.filterProduct(category, minPrice, maxPrice, minDiscount, sort);

		if (!color.isEmpty()) {
			customizedProducts = customizedProducts.stream().filter(p -> color.stream().anyMatch(c -> c.equalsIgnoreCase(p.getColor())))
					.collect(Collectors.toList());
		}
		if (stock != null) {
			if (stock.equals("in_stock")) {
				customizedProducts = customizedProducts.stream().filter(p -> p.getQuantity() > 0).collect(Collectors.toList());
			} else if (stock.equals("out_of_stock")) {
				customizedProducts = customizedProducts.stream().filter(p -> p.getQuantity() < 1).collect(Collectors.toList());
			}
		}

		int startIndex = (int) pageable.getOffset();
		int endIndex = Math.min(startIndex + pageable.getPageSize(), customizedProducts.size());

		List<CustomizedProduct> pageContents = customizedProducts.subList(startIndex, endIndex);

		Page<CustomizedProduct> filteredProducts = new PageImpl<>(pageContents, pageable, customizedProducts.size());

		return filteredProducts;
	}

	@Override
	public List<CustomizedProduct> findAllProducts() {
		
		return customizedProductRepository.findAll();
	}
	
	@Override
	public List<CustomizedProduct> recentlyAddedProduct() {
		return customizedProductRepository.findTop10ByOrderByCreatAtDesc();
	}

}
