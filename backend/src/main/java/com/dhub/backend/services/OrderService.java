package com.dhub.backend.services;

import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();
    List<Order> getOrdersByStatus(EStatus status);
    Order getOrderById(Long id);
    Order createOrder(Order order);
    Order updateOrder(Order order);
    void deleteOrder(Long id);
}