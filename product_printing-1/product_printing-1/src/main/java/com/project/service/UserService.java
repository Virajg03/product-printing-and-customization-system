package com.project.service;

import java.util.List;

import com.project.model.Address;
import com.project.model.User;

public interface UserService {

	public User findUserById(Long userId)throws Exception;
	
	public User findUserProfileByJwt(String jwt)throws Exception;
	
	public List<User> findAllUsers();
	
	public List<Address> findAllAddress(Long id);

	
}
