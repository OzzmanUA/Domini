package com.domini.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewStatisticsDTO {
    private float overallScore;       // Общая оценка
    private float qualityScore;       // Оценка качества работы
    private float politenessScore;    // Оценка вежливости
    private float punctualityScore;   // Оценка пунктуальности
}
