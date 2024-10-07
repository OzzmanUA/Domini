package com.domini.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private String taskDescription;  // Описание задания
    private float overallRating;     // Общая оценка
    private String completionDate;   // Дата завершения
    private String feedback;         // Текст отзыва
    private float workQualityRating; // Оценка качества работы
    private float politenessRating;  // Оценка вежливости
    private float punctualityRating; // Оценка пунктуальности
    private String clientFirstName;
}
