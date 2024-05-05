package com.project.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.exception.DesignException;
import com.project.exception.ProductException;
import com.project.model.CustomizedProduct;
import com.project.model.Design;
import com.project.model.Product;
import com.project.model.User;
import com.project.repository.CustomizedProductRepository;
import com.project.repository.DesignRepository;
import com.project.repository.ProductRepository;


@Service
public class DesignServiceImplementation implements DesignService {

	private final String FOLDER_PATH = "D:\\eclipse\\e-commerce-server\\product_printing-1\\product_printing-1\\target\\image"; 
	
	@Autowired
	private DesignRepository designRepository;

	@Autowired
	private CustomizedProductService customizedProductService;

	@Autowired
	private CustomizedProductRepository customizedProductRepository;

	@Override
	public String saveDesign(MultipartFile file, Long productId, User user,String loc) throws IOException, ProductException {


		CustomizedProduct customizedProduct = customizedProductService.findProductById(productId);

		Design imageData = new Design();


		String filePath = FOLDER_PATH + file.getOriginalFilename();
		
		try (OutputStream outputStream = new FileOutputStream(filePath)) {
	        outputStream.write(file.getBytes());
	    } catch (IOException e) {
	        // Handle file save failure
	        e.printStackTrace();
	        throw new IOException("Failed to save file: " + file.getOriginalFilename());
	    }
		
		imageData.setPosition(loc);
		imageData.setName(file.getOriginalFilename());
		imageData.setType(file.getContentType());
		imageData.setFilePath(filePath);    
		imageData.setCustomizedProduct(customizedProduct);
		imageData.setUser(user);
		imageData.setAddedAt(LocalDateTime.now());
		
		Design save = designRepository.save(imageData);

//		file.transferTo(new File(filePath));
		
		customizedProduct.setDesign(imageData);

		customizedProductRepository.save(customizedProduct);
		if (save != null) {
			return "file uploaded successfully : " + file.getOriginalFilename();
		}
		return null;
	}
	
	@Override
	public String updateDesign(MultipartFile file, Long productId, User user,Long desingId) throws IOException, ProductException, DesignException {


		CustomizedProduct customizedProduct = customizedProductService.findProductById(productId);

		Design imageData = findDesignById(desingId);


		String filePath = FOLDER_PATH + file.getOriginalFilename();
		
		try (OutputStream outputStream = new FileOutputStream(filePath)) {
	        outputStream.write(file.getBytes());
	    } catch (IOException e) {
	        // Handle file save failure
	        e.printStackTrace();
	        throw new IOException("Failed to save file: " + file.getOriginalFilename());
	    }
		
		imageData.setName(file.getOriginalFilename());
		imageData.setType(file.getContentType());
		imageData.setFilePath(filePath);    
		imageData.setCustomizedProduct(customizedProduct);
		imageData.setUser(user);
		imageData.setAddedAt(LocalDateTime.now());
		
		Design save = designRepository.save(imageData);

//		file.transferTo(new File(filePath));
		
		customizedProduct.setDesign(imageData);

		customizedProductRepository.save(customizedProduct);
		if (save != null) {
			return "file uploaded successfully : " + file.getOriginalFilename();
		}
		return null;
	}

	@Override
	public byte[] getDesignById(Long id) throws IOException {
		Optional<Design> dbImageData = designRepository.findById(id);

		
		String filePath = dbImageData.get().getFilePath();
		byte[] imagesData = Files.readAllBytes(new File(filePath).toPath());
		return imagesData;
	}

	@Override
	public void deleteDesignById(Long productId, Long designId) throws DesignException, ProductException {
		Design design = findDesignById(designId);

		CustomizedProduct customizedProduct = customizedProductService.findProductById(productId);

		if (design.getId().equals(customizedProduct.getId())) {
			designRepository.deleteById(designId);
		}
	}
	
	

	@Override
	public Design findDesignById(Long designId) throws DesignException {
		Optional<Design> design = designRepository.findById(designId);

		if (design.isPresent()) {
			return design.get();
		}

		throw new DesignException("Design not found with id " + designId);
	}

	// find design by productId
	@Override
	public byte[] findDesignByProductId(Long productId) throws IOException {

		Optional<CustomizedProduct> product = customizedProductRepository.findById(productId);

		CustomizedProduct product2 = product.get();

		Design design = product2.getDesign();

		String filePath = design.getFilePath();
		byte[] imagesData = Files.readAllBytes(new File(filePath).toPath());
		return imagesData;

	}

}
