package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
