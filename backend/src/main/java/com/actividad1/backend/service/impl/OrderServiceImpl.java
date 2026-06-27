package com.actividad1.backend.service.impl;

import org.springframework.stereotype.Service;

import com.actividad1.backend.entity.Book;
import com.actividad1.backend.entity.Order;
import com.actividad1.backend.repository.BookRepository;
import com.actividad1.backend.repository.OrderRepository;
import com.actividad1.backend.service.OrderService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    @Transactional
    public Order createOrder(Order order) {
        // 1. Validar lista de libros
        if (order.getBooks() == null || order.getBooks().isEmpty()) {
            throw new RuntimeException("The order must contain at least one book");
        }

        // 2. Procesar cada libro
        for (String bookId : order.getBooks()) {

            // Buscar libro
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Book not found: " + bookId));

            // Verificar stock
            if (book.getQuantity() == null || book.getQuantity() <= 0) {
                throw new RuntimeException("No stock available for book: " + bookId);
            }

            // Restar stock
            book.setQuantity(book.getQuantity() - 1);

            // Guardar actualización del libro
            bookRepository.save(book);
        }

        // 3. Crear pedido
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public List<Order> getOrdersByBuyer(String buyer) {
        return orderRepository.findByBuyer(buyer);
    }
}
