package com.actividad1.backend.service;



import java.util.List;
import java.util.Optional;

import com.actividad1.backend.entity.Order;

public interface OrderService {

    List<Order> getAllOrders();

    Optional<Order> getOrderById(Long id);

    Order createOrder(Order order);

    void deleteOrder(Long id);

    List<Order> getOrdersByBuyer(String buyer);
}