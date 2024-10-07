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
    private String firstName;  // Добавить в модель User поле для имени
    private String lastName;   // Добавить в модель User поле для фамилии
    private String category;   // Текущая категория
    private String subcategory; // Текущая подкатегория
    private String country;    // Страна
    private String city;       // Город
    private Double servicePrice; // Цена за услуги
    private String about;      // Описание (из privateInformation)
    private List<String> categories;  // Все категории, в которых работает пользователь
}
