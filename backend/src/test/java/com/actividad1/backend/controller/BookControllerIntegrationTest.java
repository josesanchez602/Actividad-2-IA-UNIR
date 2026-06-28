package com.actividad1.backend.controller;

import com.actividad1.backend.entity.Book;
import com.actividad1.backend.repository.BookRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class BookControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/books debe devolver 200, la lista completa y datos esperados")
    void getAllBooks_shouldReturnOkAndExpectedJson() throws Exception {
        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$[?(@.id == '9780140449136')].title").value(hasItem("The Odyssey")))
                .andExpect(jsonPath("$[?(@.id == '9780451524935')].author").value(hasItem("George Orwell")));
    }

    @Test
    @DisplayName("GET /api/books/{id} debe devolver 200 y el libro solicitado")
    void getBookById_shouldReturnOkAndBook() throws Exception {
        mockMvc.perform(get("/api/books/9780451524935"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value("9780451524935"))
                .andExpect(jsonPath("$.title").value("1984"))
                .andExpect(jsonPath("$.author").value("George Orwell"))
                .andExpect(jsonPath("$.quantity").value(7));
    }

    @Test
    @DisplayName("DELETE /api/books/{id} debe devolver 204 y eliminar el libro")
    void deleteBook_shouldReturnNoContentAndDeleteBook() throws Exception {
        String bookId = "9780451524935";

        mockMvc.perform(delete("/api/books/{id}", bookId))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/books/{id}", bookId))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PUT /api/books/{id} debe devolver 200 y actualizar el libro")
    void updateBook_shouldReturnOkAndUpdateBook() throws Exception {
        String bookId = "9780451524935";

        Book updatedBook = Book.builder()
                .id(bookId)
                .title("1984 - Updated")
                .author("George Orwell")
                .price(BigDecimal.valueOf(15.99))
                .cover("updated-cover")
                .genre("Dystopian")
                .description("Updated description")
                .quantity(11)
                .build();

        mockMvc.perform(put("/api/books/{id}", bookId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedBook)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(bookId))
                .andExpect(jsonPath("$.title").value("1984 - Updated"))
                .andExpect(jsonPath("$.price").value(15.99))
                .andExpect(jsonPath("$.quantity").value(11));

        Book persistedBook = bookRepository.findById(bookId).orElseThrow();
        org.junit.jupiter.api.Assertions.assertEquals("1984 - Updated", persistedBook.getTitle());
        org.junit.jupiter.api.Assertions.assertEquals(11, persistedBook.getQuantity());
    }
}