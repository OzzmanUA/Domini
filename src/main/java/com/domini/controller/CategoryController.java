package com.domini.controller;

import com.domini.dtos.*;
import com.domini.model.Category;
import com.domini.model.User;
import com.domini.services.CategoryService;
import com.domini.services.LocationService;
import com.domini.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final UserService userService;
    @Autowired
    private LocationService locationService;

    // Метод для поиска категории по id
    @GetMapping("/{id}")
    public ResponseEntity<String> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.findById(id);
        if (category != null) {
            return ResponseEntity.ok(category.getName());  // Возвращаем категорию, если она найдена
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);  // Возвращаем 404, если категория не найдена
        }
    }

    // Вывод только имен родительских категорий
    @GetMapping("/categories")
    public List<CategoryNameDTO> getAllParentCategories() {
        return categoryService.getAllParentCategoriesDTO();
    }

    // Вывод топ подкатегорий с изображениями
    @GetMapping("/top-subcategories")
    public List<CategoryDTO> getTopSubcategories() {
        return categoryService.getTop10SubcategoriesWithMostTasks();
    }

    // Вывод всех категорий с подкатегориями (изображения только для родительских категорий)
    @GetMapping("/all-categories")
    public List<CategoryWithSubcategoriesDTO> getAllCategoriesWithSubcategories() {
        return categoryService.getCategoriesWithSubcategories();
    }

    // Получение списка пользователей, работающих в категории или подкатегории
    @GetMapping("/{categoryId}/workers")
    public List<WorkerInfoDTO> getWorkersByCategory(@PathVariable Long categoryId) {
        return categoryService.getWorkersByCategory(categoryId);
    }

    // Получение списка пользователей, работающих в категории или подкатегории с фильтрацией
    @GetMapping("/{categoryId}/workers/filter")
    public List<WorkerInfoDTO> getWorkersByCategory(@PathVariable Long categoryId,
                                                    @RequestParam(required = false) Double minPrice,
                                                    @RequestParam(required = false) Double maxPrice,
                                                    @RequestParam(required = false) String skillLevel,
                                                    @RequestParam(required = false) String country,
                                                    @RequestParam(required = false) String city) {
        Integer experienceYears = skillLevel != null ? convertSkillLevelToYears(skillLevel) : null; // Если skillLevel не null, конвертируем
        return categoryService.getWorkersByCategory(categoryId, minPrice, maxPrice, experienceYears, country, city);
    }

    @GetMapping("/{categoryId}/tasks")
    public ResponseEntity<List<TaskDTO>> getTasksByCategory(@PathVariable Long categoryId) {
        List<TaskDTO> tasks = categoryService.getTasksByCategory(categoryId);
        return ResponseEntity.ok(tasks);
    }

    // Получение задач в категории, с фильтрацией по цене и локации
    @GetMapping("/{categoryId}/tasks/filter")
    public ResponseEntity<List<TaskDTO>> getTasksInCategory(@PathVariable Long categoryId,
                                            @RequestParam(required = false) Double minPrice,
                                            @RequestParam(required = false) Double maxPrice,
                                            @RequestParam(required = false) String country,
                                            @RequestParam(required = false) String city) {

        List<TaskDTO> tasks = categoryService.getTasksInCategory(categoryId, minPrice, maxPrice, country, city);
        return ResponseEntity.ok(tasks);
    }

    // Получение подробной информации о работнике по его ID
    @GetMapping("/workers/{workerId}")
    public ResponseEntity<WorkerDetailedDTO> getWorkerDetailedInfo(@PathVariable Long workerId) {
        WorkerDetailedDTO workerInfo = categoryService.getWorkerDetailedInfoById(workerId);
        return ResponseEntity.ok(workerInfo);
    }

    // Метод для преобразования уровня навыков в годы опыта
    private Integer convertSkillLevelToYears(String skillLevel) {

        return switch (skillLevel.toLowerCase()) {
            case "junior" -> 1;
            case "middle" -> 3;
            case "senior" -> 5;
            default -> null; // Если уровень навыков не распознан
        };
    }

    // Получение списка всех городов
    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        List<String> cities = locationService.getAllCities();
        return ResponseEntity.ok(cities);
    }
}
