package com.actividad1.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.actividad1.backend.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {
    
}