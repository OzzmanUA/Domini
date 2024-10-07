package com.domini.controller;

import com.domini.dtos.TaskCreateDTO;
import com.domini.enums.TaskStatus;
import com.domini.model.Category;
import com.domini.model.Location;
import com.domini.model.Task;
import com.domini.model.User;
import com.domini.services.CategoryService;
import com.domini.services.TaskService;
import com.domini.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final CategoryService categoryService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<String> createTask(@RequestBody TaskCreateDTO taskCreateDTO) {
        // Получаем категорию
        Category category = categoryService.findById(taskCreateDTO.getCategoryId());
        if (category == null) {
            return ResponseEntity.badRequest().body("Invalid category ID");
        }

        // Получаем клиента (заказчика)
        User client = userService.getUserById(taskCreateDTO.getClientId());
        if (client == null) {
            return ResponseEntity.badRequest().body("Invalid client ID");
        }

        // Создаем локацию
        Location location = new Location(
                taskCreateDTO.getCountry(),
                taskCreateDTO.getCity(),
                taskCreateDTO.getDistrict(),
                taskCreateDTO.getStreet(),
                taskCreateDTO.getHouse()
        );

        // Создаем задачу
        Task task = new Task();
        task.setDescription(taskCreateDTO.getDescription());
        task.setDetails(taskCreateDTO.getDetails());
        task.setCategory(category);
        task.setLocation(location);
        task.setPrice(taskCreateDTO.getPrice());
        task.setCompletionDate(taskCreateDTO.getCompletionDate());
        task.setStatus(taskCreateDTO.getStatus() != null ? taskCreateDTO.getStatus() : TaskStatus.ACTIVE);
        task.setClient(client);  // Устанавливаем заказчика
        task.setConfirmed(false);  // Устанавливаем подтверждение как false по умолчанию

        // Сохраняем задачу
        taskService.saveTask(task);

        return ResponseEntity.ok("Task created successfully");
    }
}
