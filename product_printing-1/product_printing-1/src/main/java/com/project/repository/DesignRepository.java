package com.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.model.Design;

public interface DesignRepository extends JpaRepository<Design, Long>{

	Optional<Design> findByName(String fileName);
	
}
