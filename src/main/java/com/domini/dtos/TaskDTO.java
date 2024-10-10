package com.domini.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TaskDTO {
    private Long taskId;
//    private String userAvatar;
    private String firstName;
    private String lastName;
    private String category;
    private Double price;
    private LocalDate dueDate;
    private String description;
}
