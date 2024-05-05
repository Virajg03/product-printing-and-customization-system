package com.project.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.responce.ApiResponce;


@RestController
public class HomeController {

	@GetMapping("/")
	public ResponseEntity<ApiResponce> homeController(){
		
		ApiResponce res=new ApiResponce("Welcome To Product Printing And Customization System", true);
		
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
}
