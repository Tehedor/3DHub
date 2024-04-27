package com.dhub.backend.controllers;

import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
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
import com.dhub.backend.util.FileUploadUtil;

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

@RestController
// @PreAuthorize("hasRole('ROLE_MANUFACTURER' or 'ROLE_DESIGNER' or 'ROLE_ADMIN')")
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PrinterRepository printerRepository;

    @Autowired
    private PrinterService printerService;

    @Autowired
    private RatingsService ratingsService;

    //Obtener todos los pedidos ¿?¿?¿?
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    //Obtener pedido por id ¿?¿?¿?
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Actualizar pedido ¿?¿?¿?
    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable Long id, @RequestBody Order order) {
        // You might want to ensure the ID in the Order object and the ID in the path are the same.
        return orderService.updateOrder(order);
    }

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
     */
    @PostMapping("/create/{idPrinter}")
    public ResponseEntity<?> createOrder(@PathVariable Long idPrinter, @RequestBody OrderDTO orderDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Printer printer = printerRepository.findById(idPrinter)
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
     * Uploads the 3D file to the order and saves the path in the database
     * TODO: Add a check to see if the user is the owner of the order
     */
    @PutMapping("/uploadfile/{id}")
    public ResponseEntity<Printer> uploadFile(@Valid @RequestPart("file") MultipartFile file,@PathVariable Long id) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Pedido no encontrada."));

        // if (user.getId() != order.getUserEntity().getId()) {
        //     return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        // }

        if (file != null) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uploadDir = "orderFiles\\";
        FileUploadUtil.saveFile(uploadDir, fileName, file);
        order.setFile(uploadDir + fileName);
        orderRepository.save(order);
    }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    /*
     * Changes the status of the order
     */
    @PutMapping("/{id}/status")
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
        if (Arrays.stream(EStatus.values()).anyMatch(s -> s.name().equals(newStatus))) {
            order.setStatus(newStatus);
            orderRepository.save(order);
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Estado inválido."));
        }
        return ResponseEntity.ok(new MessageResponse("Petición de"+ user.getUsername() +" del pedido " 
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

        List<OrderDTO> orders = user.getOrdersWithoutUserEntity();
        List<OrderDTO> status = orderService.getOrdersByStatus(EStatus.KART, orders);
        List<Long> printerIds = status.stream()
            .map(order -> order.getPrinter_id())
            .distinct()
            .collect(Collectors.toList());
        List<PrinterDTO> printers = new ArrayList<>();
        for (Long printerId : printerIds) {
            PrinterDTO printer = printerService.getPrinterById(printerId);
            printers.add(printer);
        }

        List<UserDTO> users = new ArrayList<>();
        for (OrderDTO statu : status) {
            UserEntity userEntity = userRepository.findById(statu.getUser_id())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
            users.add(userEntity.getUsersWithoutEntity());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("printers", printers);
        response.put("orders", status);
        response.put("users", users);
        
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

        List<OrderDTO> orders = user.getOrdersWithoutUserEntity();
        List<OrderDTO> status = orderService.getOrdersExcludingStatus(EStatus.KART, orders);
        List<OrderDTO> order1 = orderService.getOrdersByUserId(user.getId(), status);
        if(order1.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(order1, HttpStatus.OK);
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

        List<OrderDTO> orders = user.getOrdersWithoutUserEntity();
        List<OrderDTO> status = orderService.getOrdersByStatus(EStatus.DELIVERED, orders);
        List<OrderDTO> order1 = orderService.getOrdersByUserId(user.getId(), status);
        List<Long> orderIds = order1.stream()
            .map(OrderDTO::getId)
            .collect(Collectors.toList());

        List<RatingsDTO> ratings = ratingsService.getRatingsByOrderIds(orderIds);
        Map<String, Object> response = new HashMap<>();
        response.put("orders", order1);
        response.put("ratings", ratings);

        if(order1.isEmpty()) {
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

        List<PrinterDTO> printers = user.getPrintersWithoutUserEntity();

        List<Long> printerIds = printers.stream()
            .map(PrinterDTO::getId)
            .collect(Collectors.toList());

        // Crear metodo de obtener pedidos asignados a printerId
        List<Order> allOrders = orderService.getAllOrders();

        //Falta convertir a OrderDTO

        List<Order> ordersDTOByPrinter = orderService.getOrdersByPrinterId2(printerIds, allOrders);
        List<OrderDTO> getOrdersWithoutUserEntity =
        ordersDTOByPrinter.stream()
            .map(order -> {
                OrderDTO orderDTO = new OrderDTO();
                // Copiar todos los atributos de order a orderDTO
                orderDTO.setId(order.getId());
                orderDTO.setOrderdate(order.getOrderdate());
                orderDTO.setSpecs(order.getSpecs());
                orderDTO.setManufacturerdate(order.getManufacturerdate());
                orderDTO.setPickupdate(order.getPickupdate());
                orderDTO.setNumber(order.getNumber());
                orderDTO.setStatus(order.getStatus());
                orderDTO.setUser_id(order.getUserEntity().getId());
                orderDTO.setPrinter_id(order.getPrinter().getId());
                
                return orderDTO;
            })
            .collect(Collectors.toList());

        List<UserDTO> users = new ArrayList<>();
        for (OrderDTO order : getOrdersWithoutUserEntity) {
            UserEntity userEntity = userRepository.findById(order.getUser_id())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
            users.add(userEntity.getUsersWithoutEntity());
        }
                
        Map<String, Object> response = new HashMap<>();
        response.put("printers", printers);
        response.put("orders", getOrdersWithoutUserEntity);
        response.put("users", users);


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

        List<PrinterDTO> printers = user.getPrintersWithoutUserEntity();

        List<Long> printerIds = printers.stream()
            .map(PrinterDTO::getId)
            .collect(Collectors.toList());

        // Crear metodo de obtener pedidos asignados a printerId
        List<Order> allOrders = orderService.getAllOrders();

        //Falta convertir a OrderDTO

        List<Order> ordersDTOByPrinter = orderService.getOrdersByPrinterId2(printerIds, allOrders);
        List<OrderDTO> getOrdersWithoutUserEntity =
        ordersDTOByPrinter.stream()
            .map(order -> {
                OrderDTO orderDTO = new OrderDTO();
                // Copiar todos los atributos de order a orderDTO
                orderDTO.setId(order.getId());
                orderDTO.setOrderdate(order.getOrderdate());
                orderDTO.setSpecs(order.getSpecs());
                orderDTO.setManufacturerdate(order.getManufacturerdate());
                orderDTO.setPickupdate(order.getPickupdate());
                orderDTO.setNumber(order.getNumber());
                orderDTO.setStatus(order.getStatus());
                orderDTO.setUser_id(order.getUserEntity().getId());
                orderDTO.setPrinter_id(order.getPrinter().getId());
                
                return orderDTO;
            })
            .collect(Collectors.toList());

        List<UserDTO> users = new ArrayList<>();
        for (OrderDTO order : getOrdersWithoutUserEntity) {
            UserEntity userEntity = userRepository.findById(order.getUser_id())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));
            users.add(userEntity.getUsersWithoutEntity());
        }
        List<Long> orderIds = getOrdersWithoutUserEntity.stream()
            .map(OrderDTO::getId)
            .collect(Collectors.toList());

        List<RatingsDTO> ratings = ratingsService.getRatingsByOrderIds(orderIds);


        Map<String, Object> response = new HashMap<>();
        response.put("orders", getOrdersWithoutUserEntity);
        response.put("ratings", ratings);

        if(response.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //Obtener todas las impresoras ¿?¿?¿?
    @GetMapping("/orders")
    public ResponseEntity<List<PrinterDTO>> getManufacturerPrinters() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = (authentication != null) ? authentication.getName() : null;
        UserEntity user = userRepository.findByUsername(username)
        .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        List<PrinterDTO> ratings = user.getPrintersWithoutUserEntity();
        if(ratings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }

    //Obtener todas las impresoras con sus respectivas valoraciones de un fabricante ¿?¿?¿?
    @GetMapping("/{printerId}/ratings")
    public ResponseEntity<List<RatingsDTO>> getPrinterOrderRatings(@PathVariable Long printerId) {
        List<Order> allOrders = orderService.getAllOrders();
        List<RatingsDTO> ratings = orderService.getRatingsByPrinterId(printerId, allOrders);
        ;
        if (ratings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }
}