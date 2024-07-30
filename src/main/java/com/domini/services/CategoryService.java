package com.domini.services;

import com.domini.model.Category;
import com.domini.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService{

    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public void saveCategory(Category category) {
        categoryRepository.save(category);
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public List<Category> getCategoriesWithSubcategories() {
        return categoryRepository.findAll().stream()
                .filter(category -> category.getParentCategory() == null)
                .peek(category -> category.setSubcategories(categoryRepository.findByParentCategory(category)))
                .collect(Collectors.toList());
    }
}