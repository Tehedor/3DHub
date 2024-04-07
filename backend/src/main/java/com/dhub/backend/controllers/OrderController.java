package com.dhub.backend.controllers;


import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.controllers.response.MessageResponse;
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Status;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
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
    @Autowired
    private PrinterRepository printerRepository;


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

    // public List<OrderDTO> getOrdersByStatus(EStatus status) {
    //     return orderService.getOrdersByStatus(status, getAllOrders());
    // }

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
     * TODO: add the file to the order. When logging works, we should get the user id from the token
    */
    @PostMapping("/create/{id}")
    public ResponseEntity<?> createOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Printer printer = printerRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Error: Impresora no encontrada."));

        EStatus status = EStatus.KART;
        Order order = Order.builder()
            .orderdate(new Date(System.currentTimeMillis()))
            .specs(orderDTO.getSpecs())
            .manufacturerdate(orderDTO.getManufacturerdate())
            .pickupdate(orderDTO.getPickupdate())
            .number(orderDTO.getNumber())
            .status(status)
            .userEntity(user)
            .printer(printer)
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

    /*
     * Get all orders from the kart
     * TODO: To be modified. When logging works, we should get the user id from the token
     * No parameters
     * Gets the user of the last order in the list of orders
     */
    @GetMapping("/kart")
    public List<OrderDTO> getKart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        
        List<OrderDTO> orders = user.getOrdersWithoutUserEntity();
        List<OrderDTO> status = orderService.getOrdersByStatus(EStatus.KART, orders);
        return orderService.getOrdersByUserId(user.getId(), status);
        // return orderService.getOrdersByUserId(userDetails.getId(), status);
    }
  
    //Todos los pedidos de un diseñador menos los que estén en el carrito
    @GetMapping("/designer/{id}")
    public ResponseEntity<List<OrderDTO>> getDesignerOrders(@PathVariable Long id) {
        UserEntity user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<OrderDTO> orders = user.getOrdersWithoutUserEntity();
        if(orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}