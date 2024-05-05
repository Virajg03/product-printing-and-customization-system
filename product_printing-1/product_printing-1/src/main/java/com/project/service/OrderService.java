package com.project.service;

import java.util.List;

import com.project.exception.OrderException;
import com.project.model.Address;
import com.project.model.Order;
import com.project.model.User;

public interface OrderService {

	public Order createOrder(User user, Address shippingAddress);
	
	public Order findOrderById(Long orderId)throws OrderException;
	
	public List<Order> usersOrderHistory (Long userld);
	
	public Order placedOrder(Long orderld) throws OrderException;

	public Order confirmedOrder(Long orderid)throws OrderException;
	
	public Order shippedOrder(Long orderld) throws OrderException;

	public Order deliveredOrder(Long orderld) throws OrderException; 
	
	public Order cancledOrder(Long orderid) throws OrderException;
	
	public List<Order>getAllOrders();
	
	public void deleteOrder(Long orderld) throws OrderException;
}
