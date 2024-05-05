package com.project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.exception.CartItemException;
import com.project.exception.UserException;
import com.project.model.Cart;
import com.project.model.CartItem;
import com.project.model.Product;
import com.project.model.User;
import com.project.repository.CartItemRepository;
import com.project.repository.CartRepository;

@Service
public class CartItemServiceImplementation implements CartItemService{

	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Override
	public CartItem createCartItem(CartItem cartItem) {
		cartItem.setQuantity(cartItem.getQuantity());
		if(cartItem.getProduct()==null) {
			cartItem.setPrice(cartItem.getCustomizedProduct().getPrice()*cartItem.getQuantity());	
			cartItem.setDiscountedPrice(cartItem.getCustomizedProduct().getDiscountedPrice()*cartItem.getQuantity());
		}
		if(cartItem.getCustomizedProduct()==null) {
			cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
			cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());
		}
		
		CartItem createdCartItem = cartItemRepository.save(cartItem);
		
		return createdCartItem;
	}

	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
		CartItem item = findCartItemById(id);
//		User user = userService.findUserById(item.getUserId());
		
		try {
			User user = userService.findUserById(item.getUserId());
			
			if(user.getId().equals(userId)) {
				item.setQuantity(cartItem.getQuantity());
				item.setPrice(item.getQuantity()*item.getProduct().getPrice());
				item.setDiscountedPrice(item.getProduct().getDiscountedPrice()*item.getQuantity());
				
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return cartItemRepository.save(item);
	}

	@Override
	public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
		CartItem cartItem = cartItemRepository.isCartItemExist(cart, product, size, userId);
		return cartItem;
		
	}

	@Override
	public void removeCartItem(Long userId, Long CartItemId) throws CartItemException, UserException {
		CartItem cartItem = findCartItemById(CartItemId);
		
		try {
			User user = userService.findUserById(cartItem.getUserId());
			
			User reqUser = userService.findUserById(userId);
			
			if(user.getId().equals(reqUser.getId())) {
				cartItemRepository.deleteById(CartItemId);
			}
			else {
				throw new UserException("You can't remove another users item");
			}
	
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@Override
	public CartItem findCartItemById(Long CartItemId) throws CartItemException {
		Optional<CartItem> opt = cartItemRepository.findById(CartItemId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		
		throw new CartItemException("cartitem not found with id : "+CartItemId);
	}

}
