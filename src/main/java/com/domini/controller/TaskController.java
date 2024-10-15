package com.domini.controller;

import com.domini.dtos.userTasksDTO.MyTaskDTO;
import com.domini.dtos.TaskCreateDTO;
import com.domini.dtos.userTasksDTO.UserTasksDTO;
import com.domini.enums.TaskStatus;
import com.domini.model.Category;
import com.domini.model.Location;
import com.domini.model.Task;
import com.domini.model.User;
import com.domini.services.CategoryService;
import com.domini.services.LocationService;
import com.domini.services.TaskService;
import com.domini.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {
    private final LocationService locationService;
    private final TaskService taskService;
    private final CategoryService categoryService;
    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<String> createTask(@RequestBody TaskCreateDTO taskCreateDTO) {
        // Проверка и логирование
        if (taskCreateDTO.getCategoryId() == null) {
            return ResponseEntity.badRequest().body("Category ID must not be null");
        }
        System.out.println("Category ID: " + taskCreateDTO.getCategoryId());
        Category category = categoryService.findById(taskCreateDTO.getCategoryId());
        if (category == null) {
            return ResponseEntity.badRequest().body("Invalid category ID");
        }

        // Проверка и логирование
        if (taskCreateDTO.getClientId() == null) {
            return ResponseEntity.badRequest().body("Client ID must not be null");
        }
        System.out.println("Client ID: " + taskCreateDTO.getClientId());
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

        Location savedLocation = locationService.addLocation(location);

        // Создаем задачу
        Task task = new Task();
        task.setDescription(taskCreateDTO.getDescription());
        task.setDetails(taskCreateDTO.getDetails());
        task.setCategory(category);
        task.setLocation(savedLocation);
        task.setPrice(taskCreateDTO.getPrice());
        task.setCompletionDate(taskCreateDTO.getCompletionDate());
        task.setStatus(taskCreateDTO.getStatus() != null ? taskCreateDTO.getStatus() : TaskStatus.ACTIVE);
        task.setClient(client);
        task.setConfirmed(false);

        // Сохраняем задачу
        taskService.saveTask(task);

        return ResponseEntity.ok("Task created successfully");
    }

    @PostMapping("/create-for-worker")
    public ResponseEntity<String> createTaskForWorker(
            @RequestBody TaskCreateDTO taskCreateDTO,
            @RequestParam Long workerId) {

        // Проверка и логирование
        if (taskCreateDTO.getCategoryId() == null) {
            return ResponseEntity.badRequest().body("Category ID must not be null");
        }
        System.out.println("Category ID: " + taskCreateDTO.getCategoryId());
        Category category = categoryService.findById(taskCreateDTO.getCategoryId());
        if (category == null) {
            return ResponseEntity.badRequest().body("Invalid category ID");
        }

        // Проверка и логирование
        if (taskCreateDTO.getClientId() == null) {
            return ResponseEntity.badRequest().body("Client ID must not be null");
        }
        System.out.println("Client ID: " + taskCreateDTO.getClientId());
        User client = userService.getUserById(taskCreateDTO.getClientId());
        if (client == null) {
            return ResponseEntity.badRequest().body("Invalid client ID");
        }

        // Получаем выбранного работника
        User worker = userService.getUserById(workerId);
        if (worker == null) {
            return ResponseEntity.badRequest().body("Invalid worker ID");
        }

        // Создаем локацию
        Location location = new Location(
                taskCreateDTO.getCountry(),
                taskCreateDTO.getCity(),
                taskCreateDTO.getDistrict(),
                taskCreateDTO.getStreet(),
                taskCreateDTO.getHouse()
        );

        Location savedLocation = locationService.addLocation(location);

        // Создаем задачу
        Task task = new Task();
        task.setDescription(taskCreateDTO.getDescription());
        task.setDetails(taskCreateDTO.getDetails());
        task.setCategory(category);
        task.setLocation(savedLocation);
        task.setPrice(taskCreateDTO.getPrice());
        task.setCompletionDate(taskCreateDTO.getCompletionDate());
        task.setStatus(taskCreateDTO.getStatus() != null ? taskCreateDTO.getStatus() : TaskStatus.ACTIVE);
        task.setClient(client);
        task.setWorker(worker);  // Устанавливаем выбранного работника
        task.setConfirmed(false);

        // Сохраняем задачу
        taskService.saveTask(task);

        return ResponseEntity.ok("Task created successfully for the selected worker");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserTasksDTO> getUserTasks(
            @PathVariable Long userId,
            @RequestParam(required = false) TaskStatus status) {
        UserTasksDTO userTasks = taskService.getUserTasks(userId, status);
        return ResponseEntity.ok(userTasks);
    }
}
