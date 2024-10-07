package com.domini.model;

import com.domini.enums.TaskStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, length = 1200)
    private String details;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private LocalDate completionDate;  // Дата завершения задачи (для отображения в отзыве)

    @Column(nullable = false)
    private boolean isConfirmed;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Связь с пользователем исполнителем
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    private User worker;

    // Связь с пользователем заказчиком
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private User client;

    // Связь с отзывами
    @OneToOne(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private Review review;

    // Связь с локацией
    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;
}
