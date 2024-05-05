package com.project.responce;

public class ApiResponce {
	 private String message;
	    private boolean status;

	    // Constructors, getters, and setters

	    // Default constructor
	    public ApiResponce() {
	    }

	    // Parameterized constructor
	    public ApiResponce(String message, boolean status) {
	        this.message = message;
	        this.status = status;
	    }

	    // Getter and setter for 'message'
	    public String getMessage() {
	        return message;
	    }

	    public void setMessage(String message) {
	        this.message = message;
	    }

	    // Getter and setter for 'status'
	    public boolean isStatus() {
	        return status;
	    }

	    public void setStatus(boolean status) {
	        this.status = status;
	    }
}
