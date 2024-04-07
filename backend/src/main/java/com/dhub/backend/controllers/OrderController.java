package com.dhub.backend.controllers;


import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.controllers.response.MessageResponse;
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Status;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order order) {
        // You might want to ensure the ID in the Order object and the ID in the path are the same.
        return orderService.updateOrder(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }

    /*
     * creates the order, saving the status as KART
     * TODO: add the file to the order
    */
    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        EStatus status = EStatus.KART;
        Order order = Order.builder()
            .orderdate(new Date(System.currentTimeMillis()))
            .specs(orderDTO.getSpecs())
            .manufacturerdate(orderDTO.getManufacturerdate())
            .pickupdate(orderDTO.getPickupdate())
            .number(orderDTO.getNumber())
            .status(status)
            .userEntity(user)
            .build();

        orderRepository.save(order);
        return ResponseEntity.ok(new MessageResponse("Añadido al carrito"));
    }
    
    /*
     * Changes the status of the order
     * Post syntax: "name": "CANCELLED"
     */
    @PostMapping("/{id}/status")
    public ResponseEntity<?> changeStatus(@PathVariable Long id, @RequestBody Status status) {
        EStatus newStatus = status.getName();
        Order order = getOrderById(id).getBody();
        // If the order does not exist, return 404
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        order.setStatus(newStatus);
        orderRepository.save(order);
        return ResponseEntity.ok(new MessageResponse("Petición " + id.toString() + " guardada como " + newStatus.toString()));
    }

    //Todos los pedidos de un diseñador menos los que estén en el carrito
    @GetMapping("/designer")
    public ResponseEntity<List<OrderDTO>> getDesignerOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<OrderDTO> orders = user.getOrdersWithoutUserEntity();
        if(orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

}