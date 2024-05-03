package com.dhub.backend.services;

import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.UserEntity;

import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
public interface OrderService {

    OrderDTO convertToDTO(Order order);

    Order convertToEntity(OrderDTO orderDTO);

    List<Order> getOrdersByUser(UserEntity user);

    List<Order> getOrdersByPrinterId(List<Long> ids);

    List<Long> findOrderIdsByPrinterId(Long printerId);

    List<Order> getOrdersByStatus(EStatus status, UserEntity user);

    List<Order> getOrdersExcludingStatus(EStatus status, UserEntity user);

    List<Ratings> getRatingsByPrinterId(Long printerId);

    Order createOrderWithFile(MultipartFile file, EStatus status, Date manufacturerDate, Date deliveryDate, 
    String address, String specs, Integer quantity, Long userId, Long printerId);

}