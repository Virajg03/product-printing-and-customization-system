package com.project.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.exception.DesignException;
import com.project.exception.ProductException;
import com.project.model.User;
import com.project.responce.ApiResponce;
import com.project.service.DesignService;
import com.project.service.UserService;

@RestController
@RequestMapping("/designs")
public class DesignController {
	
	@Autowired
	private DesignService designService;
	@Autowired
	private UserService userService;

	@PostMapping("/productid/{productId}/location/{location}")
	public ResponseEntity<?> createDesign(@RequestParam("image")MultipartFile file,
			@PathVariable Long productId,
			@PathVariable String location,
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
		String uploadImage = designService.saveDesign(file, productId, user,location);
		return ResponseEntity.status(HttpStatus.OK)
				.body(uploadImage); 
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> downloadImage(@PathVariable Long id) throws IOException{
		byte[] imageData=designService.getDesignById(id);
		return ResponseEntity.status(HttpStatus.OK)
				.contentType(MediaType.valueOf("image/png"))
				.body(imageData);

	}
	
	@DeleteMapping("/productid1111/{productId}/designid1111/{desingId}")
	public ResponseEntity<?> deleteDesign(@PathVariable Long productId
			,@PathVariable Long desingId) throws DesignException, ProductException{
		
		designService.deleteDesignById(productId, desingId);
		
		ApiResponce res=new ApiResponce("Item Remove From Design",true);
		
		return new ResponseEntity<ApiResponce>(res,HttpStatus.ACCEPTED);
		
	}
	
	@PutMapping("/productid111/{productId}/designid111/{desingId}")
	public ResponseEntity<?> updateDesign(@RequestParam("image")MultipartFile file,
			@PathVariable Long productId,
			@PathVariable Long desingId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		
		
		
		User user = userService.findUserProfileByJwt(jwt);
		String uploadImage = designService.updateDesign(file, productId, user,desingId);
		return ResponseEntity.status(HttpStatus.OK)
				.body(uploadImage); 
	}
	
	
	
	@GetMapping("/product/{id}")
	public ResponseEntity<?> downloadImageByProduct(@PathVariable Long id) throws IOException{
		byte[] imageData=designService.findDesignByProductId(id);
		return ResponseEntity.status(HttpStatus.OK)
				.contentType(MediaType.valueOf("image/png"))
				.body(imageData);

	}
	
}
