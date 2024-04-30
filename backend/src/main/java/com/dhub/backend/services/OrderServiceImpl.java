package com.dhub.backend.services;


import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setFile(order.getFile());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setQuantity(order.getQuantity());
        orderDTO.setAddress(order.getAddress());
        orderDTO.setSpecs(order.getSpecs());
        orderDTO.setDeliveryDate(order.getDeliveryDate());
        orderDTO.setManufacturerDate(order.getManufacturerDate());
        orderDTO.setPrinter_id(order.getPrinter().getId());
        orderDTO.setUser_id(order.getUserEntity().getId());
        return orderDTO;
    }

    @Override
    public Order convertToEntity(OrderDTO orderDTO) {
        LocalDateTime now = LocalDateTime.now();
        Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
        Order order = new Order();
        order.setOrderDate(date);
        order.setFile(orderDTO.getFile());
        order.setStatus(orderDTO.getStatus());
        order.setQuantity(orderDTO.getQuantity());
        order.setAddress(orderDTO.getAddress());
        order.setSpecs(orderDTO.getSpecs());
        order.setDeliveryDate(orderDTO.getDeliveryDate());
        order.setManufacturerDate(orderDTO.getManufacturerDate());
           return order;
    }

    @Override
    public List<Order> getOrdersByUser(UserEntity user) {
        List<Order> ordersByUser = new ArrayList<>();
        List<Order> allOrders = orderRepository.findAll();
        for (Order order : allOrders) {
            if (order.getUserEntity().getId().equals(user.getId())) {
                ordersByUser.add(order);
            }
        }
        return ordersByUser;
    }

    @Override
    public List<Order> getOrdersByPrinterId(List<Long> ids){
        List<Order> allOrders = orderRepository.findAll();
        List<Order> ordersByPrinterId = new ArrayList<>();
        for (Order order : allOrders) {
            if (ids.contains(order.getPrinter().getId())) {
                ordersByPrinterId.add(order);
            }
        }
        return ordersByPrinterId;
    }

    @Override
    public List<Long> findOrderIdsByPrinterId(Long printerId) {
        List<Long> ordersIds = new ArrayList<>();
        List<Order> allOrders = orderRepository.findAll();
        for (Order order : allOrders) {
            if (order.getPrinter().getId().equals(printerId)) {
                ordersIds.add(order.getId());
            }
        }
        return ordersIds;
    }

    @Override
    public List<Order> getOrdersByStatus(EStatus status, UserEntity user) {
        List<Order> ordersByStatus = new ArrayList<>();
        List<Order> allOrders = orderRepository.findAll();
        for (Order order : allOrders) {
            if (order.getUserEntity().getId().equals(user.getId()) && order.getStatus().equals(status)) {
                ordersByStatus.add(order);
            }
        }
        return ordersByStatus;
    }

    
    @Override
    public List<Order> getOrdersExcludingStatus(EStatus status, UserEntity user) {
        List<Order> ordersExcludingStatus = new ArrayList<>();
        List<Order> allOrders = orderRepository.findAll();
        for (Order order : allOrders) {
            if (!(order.getUserEntity().getId().equals(user.getId()) && order.getStatus().equals(status))) {
                ordersExcludingStatus.add(order);
            }
        }
        return ordersExcludingStatus;
    }

    @Override
    public List<Ratings> getRatingsByPrinterId(Long printerId) {
        List<Order> allOrders = orderRepository.findAll();
        List<Ratings> ratings = new ArrayList<>();
        for (Order order : allOrders) {
            if (order.getPrinter().getId().equals(printerId)) {
                for (Ratings rating : order.getRatings()) {
                    ratings.add(rating);
                }
            }
        }
        return ratings;
    }

}