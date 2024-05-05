package com.project.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.project.exception.DesignException;
import com.project.exception.ProductException;
import com.project.model.Design;
import com.project.model.User;

public interface DesignService {

	public String saveDesign(MultipartFile file,Long ProductId,User user,String loc) throws IOException, ProductException;
	
	public byte[] getDesignById(Long id) throws IOException;
	
	public void deleteDesignById(Long productId,Long designId) throws DesignException, ProductException; 
	
	public Design findDesignById(Long designId) throws DesignException;
	
	public byte[] findDesignByProductId(Long productId) throws IOException;
	
	public String updateDesign(MultipartFile file, Long productId, User user,Long desingId) throws IOException, ProductException, DesignException ;
	
}
