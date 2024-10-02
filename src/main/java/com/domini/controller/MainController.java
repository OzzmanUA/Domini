package com.domini.controller;

import com.domini.dtos.CategoryDTO;
import com.domini.model.Category;
import com.domini.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/main")
@AllArgsConstructor
public class MainController {
    private final CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> categories() {
        return categoryService.getAllParentCategories();
    }

    @GetMapping("/top-subcategories")
    public List<CategoryDTO> getTopSubcategories() {
        return categoryService.getTop10SubcategoriesWithMostTasks();
    }
}
