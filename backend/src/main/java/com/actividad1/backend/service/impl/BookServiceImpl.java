package com.actividad1.backend.service.impl;




import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.actividad1.backend.entity.Book;
import com.actividad1.backend.repository.BookRepository;
import com.actividad1.backend.service.BookService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookById(String id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(String id) {
        bookRepository.deleteById(id);
    }
}
