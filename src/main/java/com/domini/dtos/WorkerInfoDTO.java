package com.domini.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkerInfoDTO {
    private Long userId;
    private String avatarUrl;
    private String firstName;           // Добавить в модель User поле для имени
    private String lastName;            // Добавить в модель User поле для фамилии
    private List<String> categories;    // Список названий категорий
    private String subcategory;         // Текущая подкатегория
    private String country;             // Страна
    private String city;                // Город
    private List<CategoryWithPriceDTO> categoriesWithPrices;  // Категории с ценами
    private String about;               // Описание (из privateInformation)
    private String skillLevel;          // Уровень навыков на основе опыта
}
