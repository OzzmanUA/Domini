package com.domini.services;

import com.domini.dtos.userTasksDTO.MyTaskDTO;
import com.domini.dtos.userTasksDTO.UserTasksDTO;
import com.domini.enums.TaskStatus;
import com.domini.model.Category;
import com.domini.model.Task;
import com.domini.model.User;
import com.domini.repository.CategoryRepository;
import com.domini.repository.TaskRepository;
import com.domini.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Transactional
    public void saveTask(Task task) {
        if (task.getCategory() != null) {
            Category category = categoryRepository.findById(task.getCategory().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));
            task.setCategory(category);
        }
        taskRepository.save(task);
    }

    @Transactional
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        // Проверяем, что статус задачи "ACTIVE"
        if (!task.getStatus().equals(TaskStatus.ACTIVE)) {
            throw new IllegalArgumentException("Task cannot be deleted, it is not in active status");
        }

        taskRepository.deleteById(id);
    }

    // Принятие задачи
    @Transactional
    public void acceptTask(Long taskId, Long workerId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        // Проверяем, что задача активная
        if (!task.getStatus().equals(TaskStatus.ACTIVE)) {
            throw new IllegalArgumentException("Task cannot be accepted, it is not in active status");
        }

        // Назначаем исполнителя и меняем статус задачи
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new IllegalArgumentException("Worker not found"));
        task.setWorker(worker);
        task.setStatus(TaskStatus.IN_PROCESS);
        taskRepository.save(task);
    }

    // Редактирование задачи (только если она "ACTIVE")
    @Transactional
    public void updateTask(Long taskId, MyTaskDTO taskDTO) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        // Проверяем, что задача активная
        if (!task.getStatus().equals(TaskStatus.ACTIVE)) {
            throw new IllegalArgumentException("Task cannot be edited, it is not in active status");
        }

        // Обновляем данные задачи
        task.setDescription(taskDTO.getDescription());
        task.setPrice(taskDTO.getPrice());
        task.setCompletionDate(taskDTO.getCompletionDate());
        taskRepository.save(task);
    }

    public UserTasksDTO getUserTasks(Long userId, TaskStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Получаем задачи, где пользователь является клиентом (созданные задачи)
        List<Task> createdTasks = taskRepository.findByClient(user);

        // Получаем задачи, где пользователь является исполнителем (принятые задачи)
        List<Task> acceptedTasks = taskRepository.findByWorker(user);

        // Фильтрация по статусу, если указано
        if (status != null) {
            createdTasks = createdTasks.stream()
                    .filter(task -> task.getStatus().equals(status))
                    .toList();
            acceptedTasks = acceptedTasks.stream()
                    .filter(task -> task.getStatus().equals(status))
                    .toList();
        }

        // Преобразуем задачи в TaskDTO
        List<MyTaskDTO> createdTaskDTOs = createdTasks.stream()
                .map(this::convertToTaskDTOForClient)
                .sorted(Comparator.comparing(MyTaskDTO::getCompletionDate).reversed()) // Сортируем по дате завершения
                .collect(Collectors.toList());

        List<MyTaskDTO> acceptedTaskDTOs = acceptedTasks.stream()
                .map(this::convertToTaskDTOForWorker)
                .sorted(Comparator.comparing(MyTaskDTO::getCompletionDate).reversed()) // Сортируем по дате завершения
                .collect(Collectors.toList());

        // Возвращаем два списка в одном объекте DTO
        return new UserTasksDTO(createdTaskDTOs, acceptedTaskDTOs);
    }

    // Преобразование задачи в TaskDTO для клиента
    private MyTaskDTO convertToTaskDTOForClient(Task task) {
        MyTaskDTO taskDTO = new MyTaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setPrice(task.getPrice());
        taskDTO.setStatus(task.getStatus());
        taskDTO.setCompletionDate(task.getCompletionDate());
        if (task.getWorker() != null) {
            taskDTO.setWorkerName(task.getWorker().getPrivateInformation().getFirstName() + " " + task.getWorker().getPrivateInformation().getLastName());
        }
        return taskDTO;
    }

    // Преобразование задачи в TaskDTO для работника
    private MyTaskDTO convertToTaskDTOForWorker(Task task) {
        MyTaskDTO taskDTO = new MyTaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setPrice(task.getPrice());
        taskDTO.setStatus(task.getStatus());
        taskDTO.setCompletionDate(task.getCompletionDate());
        if (task.getClient() != null) {
            taskDTO.setClientName(task.getClient().getPrivateInformation().getFirstName() + " " + task.getClient().getPrivateInformation().getLastName());
        }
        return taskDTO;
    }
}