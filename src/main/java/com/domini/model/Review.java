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
    private float overallRating;  // Общая оценка работника

    @Column(nullable = false)
    private float workQualityRating;  // Оценка за качество работы

    @Column(nullable = false)
    private float politenessRating;  // Оценка за вежливость

    @Column(nullable = false)
    private float punctualityRating;  // Оценка за пунктуальность

    @Column(length = 1024)
    private String feedback;  // Текст отзыва от клиента

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    // Связь с пользователем, выдавшим задание
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private User client;

    // Связь с пользователем, выполнившим задание
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id")
    private User worker;


    public Long getTaskId() {
        return task.getId();
    }
}
