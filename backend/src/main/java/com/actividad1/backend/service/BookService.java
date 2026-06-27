package com.actividad1.backend.service;

import java.util.List;
import java.util.Optional;

import com.actividad1.backend.entity.Book;

public interface BookService {

    List<Book> getAllBooks();

    Optional<Book> getBookById(String id);

    Book saveBook(Book book);

    void deleteBook(String id);
}
