package com.domini.controller;

import com.domini.dtos.ReviewDTO;
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

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {
    private final LocationService locationService;
    private final TaskService taskService;
    private final CategoryService categoryService;
    private final UserService userService;

//    Принятие задачи работает через /task/{taskId}/accept с указанием workerId.
//    Редактирование и удаление задач возможно только если их статус — "ACTIVE".
//    Для редактирования и удаления доступны методы /task/{taskId} (PUT для редактирования и DELETE для удаления).

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

    // Эндпоинт для получения задач пользователя
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserTasksDTO> getUserTasks(
            @PathVariable Long userId,
            @RequestParam(required = false) TaskStatus status) {
        UserTasksDTO userTasks = taskService.getUserTasks(userId, status);
        return ResponseEntity.ok(userTasks);
    }

    // Эндпоинт для принятия задачи
    @PostMapping("/{taskId}/accept")
    public ResponseEntity<String> acceptTask(@PathVariable Long taskId, @RequestParam Long workerId) {
        taskService.acceptTask(taskId, workerId);
        return ResponseEntity.ok("Task accepted successfully");
    }

    // Эндпоинт для редактирования задачи (только если она "активная")
    @PutMapping("/{taskId}")
    public ResponseEntity<String> updateTask(@PathVariable Long taskId, @RequestBody MyTaskDTO taskDTO) {
        taskService.updateTask(taskId, taskDTO);
        return ResponseEntity.ok("Task updated successfully");
    }

    // Эндпоинт для удаления задачи (только если она "активная")
    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }

    // Завершение задачи
    @PostMapping("/{taskId}/complete")
    public ResponseEntity<String> completeTask(@PathVariable Long taskId) {
        User currentUser = userService.getCurrentUser();
        taskService.completeTask(taskId, currentUser);
        return ResponseEntity.ok("Completion request recorded");
    }

    // Отмена задачи
    @PostMapping("/{taskId}/cancel")
    public ResponseEntity<String> cancelTask(@PathVariable Long taskId) {
        User currentUser = userService.getCurrentUser();
        taskService.cancelTask(taskId, currentUser);
        return ResponseEntity.ok("Task canceled");
    }

    // Пожаловаться на задачу
    @PostMapping("/{taskId}/report")
    public ResponseEntity<String> reportTask(@PathVariable Long taskId) {
        User currentUser = userService.getCurrentUser();
        taskService.reportTask(taskId, currentUser);
        return ResponseEntity.ok("Task reported");
    }

    // Оставить отзыв после завершения задачи
    @PostMapping("/{taskId}/review")
    public ResponseEntity<String> leaveReview(@PathVariable Long taskId, @RequestBody ReviewDTO reviewDTO) {
        User currentUser = userService.getCurrentUser();
        taskService.leaveReview(taskId, currentUser, reviewDTO);
        return ResponseEntity.ok("Review submitted");
    }
}
