package com.actividad1.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String buyer;

    @ElementCollection
    @CollectionTable(
            name = "order_books",
            joinColumns = @JoinColumn(name = "order_id")
    )
    @Column(name = "book_id")
    private List<String> books;
}
