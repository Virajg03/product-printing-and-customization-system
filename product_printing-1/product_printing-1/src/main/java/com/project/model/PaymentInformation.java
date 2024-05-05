package com.project.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;


public class PaymentInformation {

	@Column(name = "cardholder_name")
	private String cardHolderName;
	
	@Column(name = "card_number")
	private String cardNumber;
	
	@Column(name = "expiration_date")
	private LocalDate expirationDate;
	
	@Column(name = "cvv")
	private String cvv;

	public PaymentInformation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PaymentInformation(String cardHolderName, String cardNumber, LocalDate expirationDate, String cvv) {
		super();
		this.cardHolderName = cardHolderName;
		this.cardNumber = cardNumber;
		this.expirationDate = expirationDate;
		this.cvv = cvv;
	}

	String getCardHolderName() {
		return cardHolderName;
	}

	void setCardHolderName(String cardHolderName) {
		this.cardHolderName = cardHolderName;
	}

	String getCardNumber() {
		return cardNumber;
	}

	void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	LocalDate getExpirationDate() {
		return expirationDate;
	}

	void setExpirationDate(LocalDate expirationDate) {
		this.expirationDate = expirationDate;
	}

	String getCvv() {
		return cvv;
	}

	void setCvv(String cvv) {
		this.cvv = cvv;
	}
	
	
}
