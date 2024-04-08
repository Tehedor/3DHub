package com.dhub.backend.controllers;


import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.controllers.request.UserDTO;
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
import com.dhub.backend.services.PrinterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Autowired
    private PrinterService printerService;


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
    @GetMapping("/designer")
    public ResponseEntity<Map<String, Object>> getDesignerOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<OrderDTO> orders = user.getOrdersWithoutUserEntity();
        List<Long> printerIds = orders.stream()
            .map(order -> order.getPrinter_id())
            .distinct()
            .collect(Collectors.toList());

        List<PrinterDTO> printers = new ArrayList<>();
        for (Long printerId : printerIds) {
            PrinterDTO printer = printerService.getPrinterById(printerId);
            printers.add(printer);
        }
        List<UserDTO> users = new ArrayList<>();
        for (OrderDTO order : orders) {
            UserEntity userEntity = userRepository.findById(order.getUser_id())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
            users.add(userEntity.getUsersWithoutEntity());
        }


        Map<String, Object> response = new HashMap<>();
        response.put("printers", printers);
        response.put("orders", orders);
        response.put("users", users);
        

        if(response	.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/designerExcludingKart")
    public ResponseEntity<List<OrderDTO>> getDesignerOrdersExcludingKart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<OrderDTO> orders = user.getOrdersWithoutUserEntity();
        List<OrderDTO> status = orderService.getOrdersExcludingStatus(EStatus.KART, orders);
        List<OrderDTO> order1 = orderService.getOrdersByUserId(user.getId(), status);
        if(order1.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(order1, HttpStatus.OK);
    }

    @GetMapping("/manufacturerOrders")
    public ResponseEntity< Map<String, Object>>  getManufacturerOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<OrderDTO> orders = user.getOrdersWithoutUserEntity();
        List<Long> printerIds = orders.stream()
            .map(order -> order.getPrinter_id())
            .distinct()
            .collect(Collectors.toList());
        
        List<PrinterDTO> printers = new ArrayList<>();
        for (Long printerId : printerIds) {
            PrinterDTO printer = printerService.getPrinterById(printerId);
            printers.add(printer);
        }

        List<UserDTO> users = new ArrayList<>();
        for (PrinterDTO printer : printers) {
            UserEntity userEntity = userRepository.findById(printer.getId())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
            users.add(userEntity.getUsersWithoutEntity());
        }

        // List<Object> listaCombinada = new ArrayList<>();
        // listaCombinada.addAll(printers);
        // listaCombinada.addAll(orders);
                
        Map<String, Object> response = new HashMap<>();
        response.put("printers", printers);
        response.put("orders", orders);
        response.put("users", users);


        if(response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}