package com.domini.dtos.userTasksDTO;

import lombok.Data;

import java.util.List;

@Data
public class UserTasksDTO {
    private List<MyTaskDTO> createdTasks;  // Задачи, созданные пользователем (где он клиент)
    private List<MyTaskDTO> acceptedTasks; // Задачи, принятые пользователем (где он работник)

    public UserTasksDTO(List<MyTaskDTO> createdTasks, List<MyTaskDTO> acceptedTasks) {
        this.createdTasks = createdTasks;
        this.acceptedTasks = acceptedTasks;
    }
}
