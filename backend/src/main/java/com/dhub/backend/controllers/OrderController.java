package com.dhub.backend.controllers;

import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.Status;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.controllers.request.OrderDTO;
import com.dhub.backend.controllers.request.PrinterDTO;
import com.dhub.backend.controllers.request.RatingsDTO;
import com.dhub.backend.controllers.request.UserDTO;
import com.dhub.backend.controllers.response.MessageResponse;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.PrinterRepository;
import com.dhub.backend.repository.UserRepository;
import com.dhub.backend.services.OrderService;
import com.dhub.backend.services.PrinterService;
import com.dhub.backend.services.RatingsService;
import com.dhub.backend.services.UserEntityService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
// @PreAuthorize("hasRole('ROLE_MANUFACTURER' or 'ROLE_DESIGNER' or 'ROLE_ADMIN')")
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PrinterRepository printerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserEntityService userEntityService;
    
    @Autowired
    private PrinterService printerService;

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private RatingsService ratingsService;

    //Obtener pedido por id ¿?¿?¿?
    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        OrderDTO orderDTO = orderService.convertToDTO(order);
        if (order != null) {
            return ResponseEntity.ok(orderDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    /*
     * Edit the order if the user is the owner of the order or the printer assigned to the order
     */
    // @PutMapping
    // public ResponseEntity<?> updateOrder(@RequestBody Order order) {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     String username = (authentication != null) ? authentication.getName() : null;
    //     UserEntity user = userRepository.findByUsername(username)
    //     .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
    //     Order order = orderRepository.findById(order.getId())
    //     .orElseThrow(() -> new RuntimeException("Error: Pedido no encontrado."));
    //     if (user.getId() == order.getUserEntity().getId() || user.getId() == order.getPrinter().getUserEntity().getId()) {
    //         orderRepository.save(order);
    //         return ResponseEntity.ok(new MessageResponse("Pedido "+ id + " eliminado"));
    //     }
        
    // }

    /*
     * Deletes the order if the user is the owner of the order or the printer assigned to the order
     */
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_DESIGNER') or hasRole('ROLE_MANUFACTURER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Order order = orderRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Error: Pedido no encontrado."));
        if (user.getId() == order.getUserEntity().getId() || user.getId() == order.getPrinter().getUserEntity().getId()) {
            orderRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Pedido "+ id + " eliminado"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new MessageResponse("No tienes permisos para eliminar este pedido"));
    }

    /*
     * creates the order, saving the status as KART
     * TODO: Create a method convertToEntity in OrderService    
     */
    // @PostMapping
    // public ResponseEntity<?> createOrder(@RequestParam("file") MultipartFile file,
    //                                     @RequestParam("manufacturerDate") Date manufacturerDate,
    //                                     @RequestParam("deliveryDate") Date deliveryDate,
    //                                     @RequestParam("quantity") Integer quantity,
    //                                     @RequestParam("specs") String specs,
    //                                     @RequestParam("printer_id") Long printer_id,
    //                                     @RequestParam("address") String address
    //                                     ) throws IOException {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     String username = (authentication != null) ? authentication.getName() : null;
    //     UserEntity user = userRepository.findByUsername(username)
    //     .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
    //     Printer printer = printerRepository.findById(printer_id)
    //     .orElseThrow(() -> new RuntimeException("Error: Impresora no encontrada."));
    //     EStatus status = EStatus.KART;
    //     Order order = orderService.createOrderWithFile(file, status, manufacturerDate, deliveryDate, address, specs, quantity, user.getId(), printer.getId());
    //     order.setUserEntity(user);
    //     order.setPrinter(printer);
    //     orderRepository.save(order);
    //     return ResponseEntity.ok(new MessageResponse("Añadido al carrito"));
    // }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestParam("file") MultipartFile file,
    @RequestParam("data") String orderDTOString) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        OrderDTO orderDTO = objectMapper.readValue(orderDTOString, OrderDTO.class);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Printer printer = printerRepository.findById(orderDTO.getPrinter_id())
        .orElseThrow(() -> new RuntimeException("Error: Impresora no encontrada."));
        EStatus status = EStatus.KART;
        Order order = new Order();
        orderDTO.setStatus(status);
        orderDTO.setDesigner_id(user.getId());
        orderDTO.setPrinter_id(printer.getId());
        order = orderService.createOrderWithFile(file, orderDTO);
        orderRepository.save(order);
        return ResponseEntity.ok(new MessageResponse("Añadido al carrito"));
    }

    /*
     * Uploads the 3D file to the order and saves the path in the database
     * TODO: Add a check to see if the user is the owner of the order
     */
    @PutMapping("/{id}")
    public ResponseEntity<Printer> uploadFile(@PathVariable Long id) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Pedido no encontrada."));

        if (user.getId() != order.getUserEntity().getId()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        orderRepository.save(order);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    /*
     * Changes the status of the order
     */
    @PutMapping("/{idOrder}/status")
    public ResponseEntity<?> changeStatus(@PathVariable Long idOrder, @RequestBody Status status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        EStatus newStatus = status.getName();
        Order order = orderRepository.findById(idOrder)
                .orElseThrow(() -> new RuntimeException("Error: Pedido no encontrado."));
        // If the order does not exist, return 404
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        // Check if newStatus is valid and exists
        if (Arrays.stream(EStatus.values()).anyMatch(s -> s.name().equals(newStatus.toString()))) {
            order.setStatus(newStatus);
            orderRepository.save(order);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Estado inválido."));
        }
        return ResponseEntity.ok(new MessageResponse("Petición de "+ user.getUsername() +" del pedido " 
        + idOrder.toString() + " guardada como " + newStatus.toString()));
    }

    /*
     * Changes the status of the order
     * TODO: Clean up the code: 
     * {getOrdersWithoutUserEntity - UserService}
     * printerService -> printerRepository
     * ....
     */
    @GetMapping("/kart")
    public ResponseEntity<Map<String, Object>> getKart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<Order> ordersKart = orderService.getOrdersByStatus(EStatus.KART, user);
        List<OrderDTO> ordersKartDTO = new ArrayList<>();
        for (Order order : ordersKart) {
            OrderDTO orderDTO = orderService.convertToDTO(order);
            ordersKartDTO.add(orderDTO);
        }

        List<Long> printerIds = ordersKart.stream()
            .map(order -> order.getPrinter().getId())
            .distinct()
            .collect(Collectors.toList());
        List<PrinterDTO> printersDTO = new ArrayList<>();
        for (Long printerId : printerIds) {
            Printer printer = printerRepository.findById(printerId)
                .orElseThrow(() -> new RuntimeException("Error: Impresora no encontrada."));
            PrinterDTO printerDTO = printerService.convertToDTO(printer);
            printersDTO.add(printerDTO);
        }

        List<UserDTO> usersDTO = new ArrayList<>();
        for (Order order : ordersKart) {
            UserEntity userEntity = userRepository.findById(order.getPrinter().getUserEntity().getId())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
            usersDTO.add(userEntityService.convertToDTO(userEntity));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("printers", printersDTO);
        response.put("orders", ordersKartDTO);
        response.put("users", usersDTO);
        
        if(response	.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
     * All designer orders
     * TODO: Clean up the code:
     * ...
     */    
    @GetMapping("/designer")
    public ResponseEntity<Map<String, Object>> getDesignerOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<Order> orders = user.getOrders();
        List<OrderDTO> ordersDTO = new ArrayList<>();
        for (Order order : orders) {
            OrderDTO orderDTO = orderService.convertToDTO(order);
            ordersDTO.add(orderDTO);
        }
        List<Long> printerIds = orders.stream()
            .map(order -> order.getPrinter().getId())
            .distinct()
            .collect(Collectors.toList());

        List<PrinterDTO> printers = new ArrayList<>();
        for (Long printerId : printerIds) {
            Printer printer = printerRepository.findById(printerId)
                .orElseThrow(() -> new RuntimeException("Error: Impresora no encontrada."));
            PrinterDTO printerDTO = printerService.convertToDTO(printer);
            printers.add(printerDTO);
        }
        List<UserDTO> users = new ArrayList<>();
        for (Order order : orders) {
            UserEntity userEntity = userRepository.findById(order.getPrinter().getUserEntity().getId())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
            users.add(userEntityService.convertToDTO(userEntity));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("printers", printers);
        response.put("orders", ordersDTO);
        response.put("users", users);
        

        if(response	.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
     * All designer orders excluding the ones in the KART status
     * TODO: Clean up the code:
     * ...
     */
    @GetMapping("/designerExcludingKart")
    public ResponseEntity<List<OrderDTO>> getDesignerOrdersExcludingKart() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<Order> orders = orderService.getOrdersExcludingStatus(EStatus.KART, user);
        List<OrderDTO> ordersDTO = new ArrayList<>();
        for (Order order : orders) {
            OrderDTO orderDTO = orderService.convertToDTO(order);
            ordersDTO.add(orderDTO);
        }

        if(orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ordersDTO, HttpStatus.OK);
    }

    //Excluye los pedidos en carrito
    /*
     * All designer orders and his ratings excluding the ones in the KART status
     */
    @GetMapping("/designerRatings")
    public ResponseEntity<Map<String, Object>> getDesignerRatings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<Order> ordersDelivered = orderService.getOrdersByStatus(EStatus.DELIVERED, user);
        List<OrderDTO> ordersDeliveredDTO = new ArrayList<>();
        for (Order order : ordersDelivered) {
            OrderDTO orderDTO = orderService.convertToDTO(order);
            ordersDeliveredDTO.add(orderDTO);
        }

        List<Long> orderIds = ordersDelivered.stream()
            .map(Order::getId)
            .collect(Collectors.toList());

        List<RatingsDTO> ratingsDTO = ratingsService.getRatingsByOrderIds(orderIds);
        Map<String, Object> response = new HashMap<>();
        response.put("orders", ordersDeliveredDTO);
        response.put("ratings", ratingsDTO);

        if(ordersDelivered.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
     * All manufacturer orders with the printers and users
     */
    @GetMapping("/manufacturerOrders")
    public ResponseEntity< Map<String, Object>>  getManufacturerOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<Printer> printers = printerRepository.findAll();
        List<PrinterDTO> printersDTO = new ArrayList<>();
        for (Printer printer : printers) {
            PrinterDTO printerDTO = printerService.convertToDTO(printer);
            printersDTO.add(printerDTO);
        }

        List<Long> printerIds = printers.stream()
            .map(Printer::getId)
            .collect(Collectors.toList());

        // // Crear metodo de obtener pedidos asignados a printerId
        // List<Order> allOrders = orderRepository.findAll();

        //Falta convertir a OrderDTO

        List<Order> ordersByPrinter = orderService.getOrdersByPrinterId(printerIds);
        List<OrderDTO> ordersDTOByPrinter = new ArrayList<>();
        for (Order order : ordersByPrinter) {
            OrderDTO orderDTO = orderService.convertToDTO(order);
            ordersDTOByPrinter.add(orderDTO);
        }

        List<UserDTO> usersDTO = new ArrayList<>();
        for (OrderDTO order : ordersDTOByPrinter) {
            UserEntity userEntity = userRepository.findById(order.getDesigner_id())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
            usersDTO.add(userEntityService.convertToDTO(userEntity));
        }
                
        Map<String, Object> response = new HashMap<>();
        response.put("printers", printersDTO);
        response.put("orders", ordersDTOByPrinter);
        response.put("users", usersDTO);


        if(response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
     * All manufacturer orders with ratings
     */
    @GetMapping("/manufacturerRatings")
    public ResponseEntity< Map<String, Object>>  getManufacturerRatings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<Printer> printers = user.getPrinters();
        List<Long> printerIds = printers.stream()
            .map(Printer::getId)
            .collect(Collectors.toList());

        //Falta convertir a OrderDTO

        List<Order> ordersByPrinter = orderService.getOrdersByPrinterId(printerIds);
        List<OrderDTO> ordersDTOByPrinter = new ArrayList<>();
        for (Order order : ordersByPrinter) {
            OrderDTO orderDTO = orderService.convertToDTO(order);
            ordersDTOByPrinter.add(orderDTO);
        }

        List<Long> orderIds = ordersDTOByPrinter.stream()
            .map(OrderDTO::getId)
            .collect(Collectors.toList());

        List<RatingsDTO> ratings = ratingsService.getRatingsByOrderIds(orderIds);


        Map<String, Object> response = new HashMap<>();
        response.put("orders", ordersDTOByPrinter);
        response.put("ratings", ratings);

        if(response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //Obtener todas las impresoras ¿?¿?¿?
    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getManufacturerPrinters() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<Order> orders = orderRepository.findAll();
        List<OrderDTO> ordersDTO = new ArrayList<>();
        if(orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ordersDTO, HttpStatus.OK);
    }

    //Obtener todas las impresoras con sus respectivas valoraciones de un fabricante ¿?¿?¿?
    @GetMapping("/{printerId}/ratings")
    public ResponseEntity<List<RatingsDTO>> getPrinterOrderRatings(@PathVariable Long printerId) {
        List<Ratings> ratings = orderService.getRatingsByPrinterId(printerId);
        List<RatingsDTO> ratingsDTO = new ArrayList<>();
        for (Ratings rating : ratings) {
            RatingsDTO ratingDTO = ratingsService.convertToDTO(rating);
            ratingsDTO.add(ratingDTO);
        }

        if (ratings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ratingsDTO, HttpStatus.OK);
    }

    @GetMapping("/{orderId}/file")
    public ResponseEntity<byte[]> getFile(@PathVariable Long orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(order.getFile(), HttpStatus.OK);
    }
    

}