package com.project.service;

import com.project.exception.CartItemException;
import com.project.exception.UserException;
import com.project.model.Cart;
import com.project.model.CartItem;
import com.project.model.Product;

public interface CartItemService {

	public CartItem createCartItem(CartItem cartItem); 
	
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException,UserException; 
	
	public CartItem isCartItemExist(Cart cart,Product product,String size,Long userId);
	
	public void removeCartItem(Long userId,Long CartItemId)throws CartItemException,UserException; 
	
	public CartItem findCartItemById(Long CartItemId)throws CartItemException;
}
