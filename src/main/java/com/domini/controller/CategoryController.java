package com.domini.controller;

import com.domini.dtos.CategoryDTO;
import com.domini.dtos.CategoryNameDTO;
import com.domini.dtos.CategoryWithSubcategoriesDTO;
import com.domini.model.Category;
import com.domini.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    // Вывод только имен родительских категорий
    @GetMapping("/categories")
    public List<CategoryNameDTO> getAllParentCategories() {
        return categoryService.getAllCategories();
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
}
