package com.project.service;

import com.project.exception.ProductException;
import com.project.model.Cart;
import com.project.model.User;
import com.project.request.AddItemRequest;

public interface CartService {
	
	public Cart createCart(User user);
	
	public String addCartItem(Long userId,AddItemRequest req)throws ProductException;
	
	public String addProductCartItem(Long userId, AddItemRequest req) throws ProductException;
	
	public Cart findUserCart(Long userId);

}
