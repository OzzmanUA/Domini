package com.domini.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkerDetailedDTO {
    private Long userId;                                        // Идентификатор пользователя
    private String avatarUrl;                                   // Аватар
    private String firstName;                                   // Имя
    private String lastName;                                    // Фамилия
    private String country;                                     // Страна
    private String city;                                        // Город
    private Double earnings;                                    // Заработанные средства
    private int completedTasksCount;                            // Количество выполненных заданий
    private List<CategoryWithPriceDTO> categoriesWithPrices;    // Категории/подкатегории с ценами
    private String about;                                       // Описание (личная информация)
    private List<String> portfolio;                             // Портфолио (изображения)
    private List<ReviewDTO> reviews;                            // Отзывы о работнике
    private ReviewStatisticsDTO reviewStatistics;               // Подробная статистика отзывов
    private String language;                                    // Языки
    private String skills;                                      // Навыки
    private String education;                                   // Образование
    private String skillLevel;                                  // Уровень навыков (определяется на основе лет опыта)
}
