package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.exception.UserException;
import com.project.model.Address;
import com.project.model.User;
import com.project.service.UserService;

@RestController
@RequestMapping("api/users")
public class UserController {

	
	@Autowired
	private UserService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt)throws UserException,Exception{
		
		User user = userService.findUserProfileByJwt(jwt);
		
		return new ResponseEntity<User>(user,HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping("/addresses")
	public ResponseEntity<List<Address>> getAllAddress(@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserProfileByJwt(jwt);
		
		List<Address> id = user.getAddress();
		
		
		return new ResponseEntity<List<Address>>(id,HttpStatus.ACCEPTED);
		
	}
	
}
