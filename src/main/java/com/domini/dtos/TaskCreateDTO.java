package com.domini.dtos;

import com.domini.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskCreateDTO {
    private Long categoryId;           // ID категории
    private String description;        // Краткое описание
    private String details;            // Детальное описание работы
    private String country;            // Страна
    private String city;               // Город
    private String district;           // Район
    private String street;             // Улица
    private String house;              // Дом
    private Double price;              // Стоимость работы
    private LocalDate completionDate;  // Дата завершения задачи
    private TaskStatus status;         // Статус задачи
    private Long clientId;             // ID клиента (заказчика)
    private Long workerId;             // ID работника
}
