package com.dhub.backend.services;


import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public List<OrderDTO> getOrdersByStatus(EStatus status, List<OrderDTO> orders) {
        List<OrderDTO> ordersByStatus = new ArrayList<>();
        for (OrderDTO order : orders) {
            if (order.getStatus().equals(status)) {
                ordersByStatus.add(order);
            }
        }
        return ordersByStatus;
    }

    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId, List<OrderDTO> orders) {
        List<OrderDTO> ordersByUserId = new ArrayList<>();
        for (OrderDTO order : orders) {
            if (order.getUser_id()==userId) {
                ordersByUserId.add(order);
            }
        }
        return ordersByUserId;
    }
}