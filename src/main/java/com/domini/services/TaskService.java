package com.domini.services;

import com.domini.model.Category;
import com.domini.model.Task;
import com.domini.repository.CategoryRepository;
import com.domini.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

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
        taskRepository.deleteById(id);
    }
}
