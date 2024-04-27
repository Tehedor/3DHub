package com.dhub.backend.services;


import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private RatingsService ratingsService;

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
    public List<OrderDTO> getOrdersExcludingStatus(EStatus status, List<OrderDTO> orders) {
        List<OrderDTO> ordersExcludingStatus = new ArrayList<>();
        for (OrderDTO order : orders) {
            if (!order.getStatus().equals(status)) {
                ordersExcludingStatus.add(order);
            }
        }
        return ordersExcludingStatus;
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

    @Override
    public List<OrderDTO> getOrdersByPrinterId(Long printerId , List<OrderDTO> orders){
        List<OrderDTO> ordersByPrinterId = new ArrayList<>();
        for (OrderDTO order : orders) {
            if (order.getPrinter_id()==printerId) {
                ordersByPrinterId.add(order);
            }
        }
        return ordersByPrinterId;
    }

    @Override
    public List<Order> getOrdersByPrinterId2(List<Long> ids, List<Order> allOrders){
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
        List<Order> allOrders = getAllOrders();
        for (Order order : allOrders) {
            if (order.getPrinter().getId().equals(printerId)) {
                ordersIds.add(order.getId());
            }
        }
        return ordersIds;
    }

    @Override
    public List<RatingsDTO> getRatingsByPrinterId(Long printerId, List<Order> allOrders) {

        List<RatingsDTO> productRatingsByPrinterId = new ArrayList<>();
        for (Order order : allOrders) {
            if (order.getPrinter().getId().equals(printerId)) {
                List<Ratings> ratings = order.getRatings();
                for (Ratings rating : ratings) {
                    RatingsDTO ratingsDTO = new RatingsDTO();
                    ratingsDTO.setId(rating.getId());
                    ratingsDTO.setDate(rating.getDate());
                    ratingsDTO.setManufacturerRating(rating.getManufacturerRating());
                    ratingsDTO.setProductRating(rating.getProductRating());
                    ratingsDTO.setFile(rating.getFile());
                    ratingsDTO.setTextRating(rating.getTextRating());
                    ratingsDTO.setOrder_id(rating.getOrder().getId());
                    ratingsDTO.setPrinter_id(rating.getOrder().getPrinter().getId());
                    productRatingsByPrinterId.add(ratingsDTO);
                }
            }
        }
        return productRatingsByPrinterId;
    }

}