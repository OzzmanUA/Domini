package com.domini.dtos.userTasksDTO;

import com.domini.enums.TaskStatus;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@RequiredArgsConstructor
public class MyTaskDTO {
    private Long id;
    private String description;
    private Double price;
    private TaskStatus status;
    private LocalDate completionDate;
    private String clientName;
    private String workerName;
}
