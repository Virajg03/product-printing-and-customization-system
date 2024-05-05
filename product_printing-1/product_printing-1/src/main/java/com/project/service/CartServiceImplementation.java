package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.exception.ProductException;
import com.project.model.Cart;
import com.project.model.CartItem;
import com.project.model.CustomizedProduct;
import com.project.model.Product;
import com.project.model.User;
import com.project.repository.CartItemRepository;
import com.project.repository.CartRepository;
import com.project.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService {

	@Autowired
	private CartRepository cartRepository;
	@Autowired
	private CartItemService cartItemService;
	@Autowired
	private ProductService productService;
	@Autowired
	private CartItemRepository cartItemRepository;
	@Autowired
	private CustomizedProductService customizedProductService;

	@Override
	public Cart createCart(User user) {
		Cart cart = new Cart();
		cart.setUser(user);
		return cartRepository.save(cart);
	}

	@Override
	public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
		Cart cart = cartRepository.findByUserId(userId);
		Product product = productService.findProductById(req.getProductId());

		CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);

		if (isPresent == null) {
			CartItem cartItem = new CartItem();
			cartItem.setProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(req.getQuantity());
			cartItem.setUserId(userId);

			int price = req.getQuantity() * product.getDiscountedPrice();

			cartItem.setPrice(price);
			cartItem.setSize(req.getSize());

			CartItem createdItem = cartItemService.createCartItem(cartItem);
			cart.getCartItems().add(createdItem);

		}
		return "Item Add To Cart";
	}

	@Override
	public String addProductCartItem(Long userId, AddItemRequest req) throws ProductException {
		Cart cart = cartRepository.findByUserId(userId);
		CustomizedProduct product = customizedProductService.findProductById(req.getProductId());

		CartItem isPresent = cartItemRepository.isCusCartItemExist(cart, product, req.getSize(), userId);

		if (isPresent == null) {
			CartItem cartItem = new CartItem();
			cartItem.setCustomizedProduct(product);
			cartItem.setCart(cart);
			cartItem.setQuantity(req.getQuantity());
			cartItem.setUserId(userId);

			int price;
			
			if(req.getQuantity() >= 25) {
				price = req.getQuantity() * (2*product.getDiscountedPrice());
			}
			else if(req.getQuantity() >= 50) {
				price = req.getQuantity() * (4*product.getDiscountedPrice());
			}
			else {
				price = req.getQuantity() * product.getDiscountedPrice();
			}
			

			

			cartItem.setPrice(price);
			cartItem.setSize(req.getSize());

			CartItem createdItem = cartItemService.createCartItem(cartItem);
			cart.getCartItems().add(createdItem);

		}
		return "Item Add To Cart";
	}

	@Override
	public Cart findUserCart(Long userId) {
		Cart cart = cartRepository.findByUserId(userId);

		int totalPrice = 0;
		int totalDiscountedPrice = 0;
		int totalItem = 0;

		for (CartItem cartItem : cart.getCartItems()) {

			if (cartItem.getProduct() == null) {
				totalPrice = totalPrice + (cartItem.getCustomizedProduct().getPrice()*cartItem.getQuantity());
				totalDiscountedPrice = totalDiscountedPrice + (cartItem.getCustomizedProduct().getDiscountedPrice()*cartItem.getQuantity());
				totalItem = totalItem + cartItem.getQuantity();
			}

			if (cartItem.getCustomizedProduct() == null) {
				totalPrice = totalPrice + (cartItem.getProduct().getPrice()*cartItem.getQuantity());
				totalDiscountedPrice = totalDiscountedPrice + (cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());
				totalItem = totalItem + cartItem.getQuantity();
			}

		}

		cart.setTotalDiscountedPrice(totalPrice - totalDiscountedPrice);
		cart.setTotalItem(totalItem);
		cart.setTotalPrice(totalPrice);
		cart.setDiscounte(totalDiscountedPrice);

		return cartRepository.save(cart);
	}

}
