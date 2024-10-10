package com.domini.controller;

import com.domini.dtos.*;
import com.domini.model.Category;
import com.domini.model.User;
import com.domini.services.CategoryService;
import com.domini.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final UserService userService;

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

    // Получение задач в категории, с фильтрацией по цене и локации
    @GetMapping("/{categoryId}/tasks")
    public ResponseEntity<List<TaskDTO>> getTasksInCategory(@PathVariable Long categoryId,
                                            @RequestParam(required = false) Double minPrice,
                                            @RequestParam(required = false) Double maxPrice,
                                            @RequestParam(required = false) String country,
                                            @RequestParam(required = false) String city) {

        User currentUser = userService.getCurrentUser();
        if (!currentUser.isWorker()) {
            return ResponseEntity.status(403).body(null);  // 403 Forbidden - если это не работник
        }

        List<TaskDTO> tasks = categoryService.getTasksInCategory(categoryId, minPrice, maxPrice, country, city);
        return ResponseEntity.ok(tasks);
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
}
