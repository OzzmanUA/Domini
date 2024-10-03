package com.domini.controller;


import com.domini.dtos.CategoryDTO;
import com.domini.dtos.CategoryNameDTO;
import com.domini.model.Category;
import com.domini.model.Photo;
import com.domini.model.User;
import com.domini.services.CategoryService;
import com.domini.services.PhotoUploadService;
import com.domini.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;
    private final CategoryService categoryService;
    private final PhotoUploadService photoUploadService;

    //Users

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Long id) {
        return new ResponseEntity<>(userService.updateUser(user, id), HttpStatus.OK);
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    //Categories

    @GetMapping("/categories")
    public List<CategoryNameDTO> getAllParentCategories() {
        return categoryService.getAllParentCategoriesDTO();
    }

    @PostMapping("/categories")
    public ResponseEntity<String> addCategory(@ModelAttribute("category") Category category,
                                              @RequestParam("file") MultipartFile file) {
        try {
            // Загружаем изображение на сервер и получаем URL
            String imageUrl = photoUploadService.uploadPhoto(file);

            // Устанавливаем URL изображения в категорию
            Photo photo = new Photo();
            photo.setUrl(imageUrl);
            category.setPhoto(photo);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Ошибка при загрузке изображения", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (category.getParentCategory() != null && category.getParentCategory().getId() == null) {
            category.setParentCategory(null);
        }

        categoryService.saveCategory(category);
        return new ResponseEntity<>("Категория добавлена успешно", HttpStatus.OK);
    }

    @GetMapping("/categories/edit/{id}")
    public ResponseEntity<Category> editCategory(@PathVariable Long id) {
        Category category = categoryService.findById(id);
        if (category != null) {
            return new ResponseEntity<>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/categories/edit/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Long id,
                                                 @ModelAttribute("category") Category category,
                                                 @RequestParam("file") MultipartFile file) {
        Category existingCategory = categoryService.findById(id);
        if (existingCategory != null) {
            existingCategory.setName(category.getName());
            existingCategory.setParentCategory(category.getParentCategory() != null ? categoryService.findById(category.getParentCategory().getId()) : null);

            if (!file.isEmpty()) {
                try {
                    // Загружаем новое изображение, если предоставлено
                    String imageUrl = photoUploadService.uploadPhoto(file);
                    Photo photo = new Photo();
                    photo.setUrl(imageUrl);
                    existingCategory.setPhoto(photo);
                } catch (IOException e) {
                    e.printStackTrace();
                    return new ResponseEntity<>("Ошибка при загрузке изображения", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }

            categoryService.saveCategory(existingCategory);
            return new ResponseEntity<>("Категория обновлена успешно", HttpStatus.OK);
        }

        return new ResponseEntity<>("Категория не найдена", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/categories/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<>("Категория удалена успешно", HttpStatus.OK);
    }
}
