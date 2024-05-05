package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.exception.OrderException;
import com.project.model.Order;
import com.project.responce.ApiResponce;
import com.project.service.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

	@Autowired
	private OrderService orderService;
	
	@GetMapping("/")
	public ResponseEntity<List<Order>> getAllOrdersHandler(){
		List<Order> orders = orderService.getAllOrders();
		return new ResponseEntity<List<Order>>(orders,HttpStatus.ACCEPTED);
	}
	
	
	@PutMapping("/{orderId}/confirmed")
	public ResponseEntity<Order> ConfrimedOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt)throws OrderException{
		
		Order order =  orderService.confirmedOrder(orderId);
		
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	@PutMapping("/{orderId}/ship")
	public ResponseEntity<Order> ShippedOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt)throws OrderException{
		
		Order order =  orderService.confirmedOrder(orderId);
		
		return new ResponseEntity<>(HttpStatus.OK);
		
	}

	@PutMapping("/{orderId}/deliver")
	public ResponseEntity<Order> DeliverOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt)throws OrderException{
		
		Order order =  orderService.confirmedOrder(orderId);
		
		return new ResponseEntity<>(HttpStatus.OK);
		
	}

	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Order> CancelOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt)throws OrderException{
		
		Order order =  orderService.confirmedOrder(orderId);
		
		return new ResponseEntity<>(HttpStatus.OK);
		
	}

	@DeleteMapping("/{orderId}/delete")
	public ResponseEntity<ApiResponce> DeleteOrderHandler(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt)throws OrderException{
		
		orderService.deleteOrder(orderId);
		
		
		ApiResponce res = new ApiResponce();
		res.setMessage("Order deleted successfully..");
		res.setStatus(true);
		
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	
	
}
