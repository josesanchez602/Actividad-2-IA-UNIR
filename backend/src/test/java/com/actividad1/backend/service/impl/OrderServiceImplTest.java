
package com.actividad1.backend.service.impl;

import com.actividad1.backend.entity.Book;
import com.actividad1.backend.entity.Order;
import com.actividad1.backend.repository.BookRepository;
import com.actividad1.backend.repository.OrderRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    @Test
    @DisplayName("Debe crear correctamente un pedido y descontar stock")
    void createOrder_shouldCreateOrderAndDecreaseStock() {
        // Arrange
        Book book = book("book-1", 4);
        Order order = new Order(null, "Alice", List.of("book-1"));

        when(bookRepository.findById("book-1")).thenReturn(Optional.of(book));
        when(bookRepository.save(any(Book.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order savedOrder = new Order(1L, "Alice", List.of("book-1"));
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        // Act
        Order result = orderService.createOrder(order);

        // Assert
        assertEquals(1L, result.getId());
        assertEquals("Alice", result.getBuyer());
        assertEquals(List.of("book-1"), result.getBooks());

        ArgumentCaptor<Book> bookCaptor = ArgumentCaptor.forClass(Book.class);
        verify(bookRepository, times(1)).findById("book-1");
        verify(bookRepository, times(1)).save(bookCaptor.capture());
        assertEquals(3, bookCaptor.getValue().getQuantity());

        verify(orderRepository, times(1)).save(order);
        verifyNoMoreInteractions(orderRepository, bookRepository);
    }

    @Test
    @DisplayName("Debe lanzar excepción si un libro del pedido no existe")
    void createOrder_whenBookDoesNotExist_shouldThrowException() {
        // Arrange
        Order order = new Order(null, "Alice", List.of("missing-book"));
        when(bookRepository.findById("missing-book")).thenReturn(Optional.empty());

        // Act
        RuntimeException exception = assertThrows(RuntimeException.class, () -> orderService.createOrder(order));

        // Assert
        assertEquals("Book not found: missing-book", exception.getMessage());
        verify(bookRepository, times(1)).findById("missing-book");
        verify(orderRepository, never()).save(any());
        verify(bookRepository, never()).save(any());
    }

    @Test
    @DisplayName("Debe lanzar excepción si no hay stock suficiente")
    void createOrder_whenStockIsInsufficient_shouldThrowException() {
        // Arrange
        Book book = book("book-1", 0);
        Order order = new Order(null, "Alice", List.of("book-1"));

        when(bookRepository.findById("book-1")).thenReturn(Optional.of(book));

        // Act
        RuntimeException exception = assertThrows(RuntimeException.class, () -> orderService.createOrder(order));

        // Assert
        assertEquals("No stock available for book: book-1", exception.getMessage());
        verify(bookRepository, times(1)).findById("book-1");
        verify(bookRepository, never()).save(any());
        verify(orderRepository, never()).save(any());
    }

    @Test
    @DisplayName("Debe actualizar correctamente el stock tras una compra")
    void createOrder_shouldUpdateStockCorrectlyAfterPurchase() {
        // Arrange
        Book book = book("book-1", 5);
        Order order = new Order(null, "Alice", List.of("book-1"));

        when(bookRepository.findById("book-1")).thenReturn(Optional.of(book));
        when(bookRepository.save(any(Book.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order saved = invocation.getArgument(0);
            saved.setId(10L);
            return saved;
        });

        // Act
        Order result = orderService.createOrder(order);

        // Assert
        assertEquals(10L, result.getId());

        ArgumentCaptor<Book> bookCaptor = ArgumentCaptor.forClass(Book.class);
        verify(bookRepository).save(bookCaptor.capture());
        assertEquals(4, bookCaptor.getValue().getQuantity());
    }

    @Test
    @DisplayName("Debe disminuir el stock correctamente cuando se compran varias unidades del mismo libro")
    void createOrder_withRepeatedBookIds_shouldDecreaseStockMultipleTimes() {
        // Arrange
        Book book = book("book-1", 5);
        Order order = new Order(null, "Alice", List.of("book-1", "book-1"));

        when(bookRepository.findById("book-1")).thenReturn(Optional.of(book));
        when(bookRepository.save(any(Book.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order saved = invocation.getArgument(0);
            saved.setId(11L);
            return saved;
        });

        // ... Act
        Order result = orderService.createOrder(order);

        // ... Assert
        assertEquals(11L, result.getId());

        // Cambia todo el enredo del captor por esta simple y limpia línea:
        assertEquals(3, book.getQuantity(), "El stock final del libro debería ser 3");

        // Verificamos que se guardó el libro 2 veces y la orden 1 vez
        verify(bookRepository, times(2)).save(any(Book.class));
        verify(orderRepository, times(1)).save(order);
    }

    private Book book(String id, int quantity) {
        return Book.builder()
                .id(id)
                .title("Title " + id)
                .author("Author " + id)
                .price(BigDecimal.TEN)
                .quantity(quantity)
                .build();
    }
}