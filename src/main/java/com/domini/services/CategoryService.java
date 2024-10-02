package com.domini.services;

import com.domini.dtos.CategoryDTO;
import com.domini.dtos.CategoryNameDTO;
import com.domini.dtos.CategoryWithSubcategoriesDTO;
import com.domini.model.Category;
import com.domini.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryService{

    private final CategoryRepository categoryRepository;

    public List<CategoryNameDTO> getAllCategories() {
        return categoryRepository.findByParentCategoryIsNull().stream()
                .map(this::convertToCategoryNameDTO)
                .collect(Collectors.toList());
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

    public List<CategoryWithSubcategoriesDTO> getCategoriesWithSubcategories() {
        return categoryRepository.findByParentCategoryIsNull().stream()
                .map(this::convertToCategoryWithSubcategoriesDTO)
                .collect(Collectors.toList());
    }

    public List<Category> getAllParentCategories() {
        return categoryRepository.findByParentCategoryIsNull();
    }

    public List<CategoryDTO> getTop10SubcategoriesWithMostTasks() {
        return categoryRepository.findTop10SubcategoriesWithMostTasks(PageRequest.of(0, 10)).stream()
                .map(this::convertToCategoryWithImageDTO)
                .collect(Collectors.toList());
    }

    private CategoryNameDTO convertToCategoryNameDTO(Category category) {
        return new CategoryNameDTO(category.getId(), category.getName());
    }

    private CategoryDTO convertToCategoryWithImageDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName(), category.getPhoto() != null ? category.getPhoto().getUrl() : null);
    }

    private CategoryWithSubcategoriesDTO convertToCategoryWithSubcategoriesDTO(Category category) {
        CategoryWithSubcategoriesDTO dto = new CategoryWithSubcategoriesDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setImageUrl(category.getPhoto() != null ? category.getPhoto().getUrl() : null);
        dto.setSubcategories(categoryRepository.findByParentCategory(category).stream()
                .map(this::convertToCategoryWithImageDTO)
                .collect(Collectors.toList()));
        return dto;
    }
}