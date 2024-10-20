package com.domini.repository;

import com.domini.model.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByParentCategory(Category parentCategory);
    List<Category> findByParentCategoryIsNull();
    @Query("SELECT c FROM Category c WHERE c.parentCategory IS NOT NULL ORDER BY SIZE(c.tasks) DESC")
    List<Category> findTop10SubcategoriesWithMostTasks(Pageable pageable);

}
