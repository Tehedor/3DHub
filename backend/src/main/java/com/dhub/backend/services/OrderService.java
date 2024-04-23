package com.dhub.backend.services;

import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import java.util.List;
public interface OrderService {
    List<Order> getAllOrders();
    List<OrderDTO> getOrdersByStatus(EStatus status, List<OrderDTO> orders);
    List<OrderDTO> getOrdersExcludingStatus(EStatus status, List<OrderDTO> orders);
    List<OrderDTO> getOrdersByUserId(Long userId, List<OrderDTO> orders);
    List<OrderDTO> getOrdersByPrinterId(Long printerId , List<OrderDTO> orders);
    List<Order> getOrdersByPrinterId2(List<Long> ids, List<Order> allOrders);
    Order getOrderById(Long id);
    Order createOrder(Order order);
    Order updateOrder(Order order);
    void deleteOrder(Long id);
    List<Integer> getRatingsByPrinterId(Long printerId, List<Order> orders);
}