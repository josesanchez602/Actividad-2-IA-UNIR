package com.actividad1.backend.controller;

import com.actividad1.backend.entity.Book;
import com.actividad1.backend.entity.Order;
import com.actividad1.backend.repository.BookRepository;
import com.actividad1.backend.repository.OrderRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class OrderControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    @DisplayName("POST /api/orders debe devolver 201 y reducir el stock del libro")
    void createOrder_whenValidRequest_shouldReturnCreatedAndUpdateStock() throws Exception {
        String bookId = "9780451524935";
        int initialQuantity = bookRepository.findById(bookId).orElseThrow().getQuantity();

        Order order = new Order(null, "Alice", List.of(bookId));
        String requestBody = objectMapper.writeValueAsString(order);

        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated());

        Book updatedBook = bookRepository.findById(bookId).orElseThrow();
        assertEquals(initialQuantity - 1, updatedBook.getQuantity());
        assertEquals(1, orderRepository.findAll().stream().filter(o -> "Alice".equals(o.getBuyer())).toList().size());
    }

    @Test
    @DisplayName("POST /api/orders debe devolver 404 cuando el libro no existe")
    void createOrder_whenBookDoesNotExist_shouldReturnNotFound() throws Exception {
        Order order = new Order(null, "Alice", List.of("missing-book"));
        String requestBody = objectMapper.writeValueAsString(order);

        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/orders debe devolver 400 cuando no hay stock suficiente")
    void createOrder_whenStockIsInsufficient_shouldReturnBadRequest() throws Exception {
        Book outOfStockBook = Book.builder()
                .id("TEST-OUT-OF-STOCK")
                .title("Out of stock book")
                .author("Test Author")
                .price(java.math.BigDecimal.TEN)
                .quantity(0)
                .build();
        bookRepository.save(outOfStockBook);

        Order order = new Order(null, "Alice", List.of("TEST-OUT-OF-STOCK"));
        String requestBody = objectMapper.writeValueAsString(order);

        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }
}