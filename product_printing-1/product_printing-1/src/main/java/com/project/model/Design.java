package com.project.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ImageData")
public class Design {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(cascade = CascadeType.ALL)
	@JsonBackReference
	private CustomizedProduct customizedProduct;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private  User user;

	private String name;
	
	private String position;
	
	private String filePath;
	
	private String type;
	

	private LocalDateTime addedAt;


	public Design() {
		super();
		// TODO Auto-generated constructor stub
	}


	


	public Design(Long id, CustomizedProduct customizedProduct, User user, String name, String position,
			String filePath, String type, LocalDateTime addedAt) {
		super();
		this.id = id;
		this.customizedProduct = customizedProduct;
		this.user = user;
		this.name = name;
		this.position = position;
		this.filePath = filePath;
		this.type = type;
		this.addedAt = addedAt;
	}





	public String getPosition() {
		return position;
	}





	public void setPosition(String position) {
		this.position = position;
	}





	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public CustomizedProduct getCustomizedProduct() {
		return customizedProduct;
	}


	public void setCustomizedProduct(CustomizedProduct customizedProduct) {
		this.customizedProduct = customizedProduct;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getFilePath() {
		return filePath;
	}


	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public LocalDateTime getAddedAt() {
		return addedAt;
	}


	public void setAddedAt(LocalDateTime addedAt) {
		this.addedAt = addedAt;
	}
	
	

}
