package com.actividad1.backend.service.impl;

import com.actividad1.backend.entity.Book;
import com.actividad1.backend.repository.BookRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookServiceImpl bookService;

    @Test
    @DisplayName("Debe devolver todos los libros cuando el repositorio contiene datos")
    void getAllBooks_shouldReturnAllBooks() {
        // Arrange
        List<Book> expectedBooks = List.of(
                book("1", "Book One", "Author One", 10.00, 5),
                book("2", "Book Two", "Author Two", 12.50, 3)
        );
        when(bookRepository.findAll()).thenReturn(expectedBooks);

        // Act
        List<Book> result = bookService.getAllBooks();

        // Assert
        assertEquals(2, result.size());
        assertEquals(expectedBooks, result);
        verify(bookRepository, times(1)).findAll();
        verifyNoMoreInteractions(bookRepository);
    }

    @Test
    @DisplayName("Debe devolver un libro existente por id")
    void getBookById_whenBookExists_shouldReturnBook() {
        // Arrange
        Book expectedBook = book("1", "Book One", "Author One", 10.00, 5);
        when(bookRepository.findById("1")).thenReturn(Optional.of(expectedBook));

        // Act
        Optional<Book> result = bookService.getBookById("1");

        // Assert
        assertTrue(result.isPresent());
        assertEquals(expectedBook, result.orElseThrow());
        verify(bookRepository, times(1)).findById("1");
        verifyNoMoreInteractions(bookRepository);
    }

    @Test
    @DisplayName("Debe devolver Optional.empty cuando el libro no existe")
    void getBookById_whenBookDoesNotExist_shouldReturnEmptyOptional() {
        // Arrange
        when(bookRepository.findById("missing-id")).thenReturn(Optional.empty());

        // Act
        Optional<Book> result = bookService.getBookById("missing-id");

        // Assert
        assertTrue(result.isEmpty());
        verify(bookRepository, times(1)).findById("missing-id");
        verifyNoMoreInteractions(bookRepository);
    }

    private Book book(String id, String title, String author, double price, int quantity) {
        return Book.builder()
                .id(id)
                .title(title)
                .author(author)
                .price(BigDecimal.valueOf(price))
                .quantity(quantity)
                .build();
    }
}
