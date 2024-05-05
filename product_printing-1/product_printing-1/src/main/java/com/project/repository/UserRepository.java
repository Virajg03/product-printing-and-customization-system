package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	public User findByEmail(String email);

	public List<User> findAllByOrderByCreatedAtDesc(); 
	
}
