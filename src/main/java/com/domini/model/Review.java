package com.domini.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private float score;

    @Column(length = 1024)
    private String text;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    // Связь с пользователем, выдавшим задание
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private User client;

    // Связь с пользователем, выполнившим задание
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    private User worker;
}
