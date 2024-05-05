package com.project.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class CustomizedProduct {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String title;
	
	private String description;
	
	private int price;
	
	private int customizationPrice;
	
	@Column(name = "discount_price")
	private int discountedPrice;
	
	@Column(name = "discount_persent")
	private int discountPersent;
	
	@Column(name = "quantity")
	private int quantity;
	
	@Column(name = "brand")
	private String brand;
	
	@Column(name = "color")
	private String color;
	
	
	@Embedded
	@ElementCollection
	@Column(name = "size")
	private Set<Size> sizes = new HashSet<>();
	
	
	@Column(name = "image_url")
	private String imageUrl;
	
	
	@OneToMany(mappedBy = "customizedProduct",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Rating> rating = new ArrayList<>();
	
	@OneToMany(mappedBy = "customizedProduct",cascade = CascadeType.ALL,orphanRemoval = true)	
	private List<Review> reviews = new ArrayList<>();
	
	@Column(name = "num_ratings")
	private int numRating;
	
	@ManyToOne
	@JoinColumn(name = "catagory_id")
	private Category category;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JsonManagedReference
	private Design design;
	
	private LocalDateTime creatAt;

	public CustomizedProduct() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CustomizedProduct(Long id, String title, String description, int price, int customizationPrice,
			int discountedPrice, int discountPersent, int quantity, String brand, String color, Set<Size> sizes,
			String imageUrl, List<Rating> rating, List<Review> reviews, int numRating, Category category, Design design,
			LocalDateTime creatAt) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.price = price;
		this.customizationPrice = customizationPrice;
		this.discountedPrice = discountedPrice;
		this.discountPersent = discountPersent;
		this.quantity = quantity;
		this.brand = brand;
		this.color = color;
		this.sizes = sizes;
		this.imageUrl = imageUrl;
		this.rating = rating;
		this.reviews = reviews;
		this.numRating = numRating;
		this.category = category;
		this.design = design;
		this.creatAt = creatAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getCustomizationPrice() {
		return customizationPrice;
	}

	public void setCustomizationPrice(int customizationPrice) {
		this.customizationPrice = customizationPrice;
	}

	public int getDiscountedPrice() {
		return discountedPrice;
	}

	public void setDiscountedPrice(int discountedPrice) {
		this.discountedPrice = discountedPrice;
	}

	public int getDiscountPersent() {
		return discountPersent;
	}

	public void setDiscountPersent(int discountPersent) {
		this.discountPersent = discountPersent;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Set<Size> getSizes() {
		return sizes;
	}

	public void setSizes(Set<Size> sizes) {
		this.sizes = sizes;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public List<Rating> getRating() {
		return rating;
	}

	public void setRating(List<Rating> rating) {
		this.rating = rating;
	}

	public List<Review> getReviews() {
		return reviews;
	}

	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}

	public int getNumRating() {
		return numRating;
	}

	public void setNumRating(int numRating) {
		this.numRating = numRating;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Design getDesign() {
		return design;
	}

	public void setDesign(Design design) {
		this.design = design;
	}

	public LocalDateTime getCreatAt() {
		return creatAt;
	}

	public void setCreatAt(LocalDateTime creatAt) {
		this.creatAt = creatAt;
	}
	
	
	

	
}
