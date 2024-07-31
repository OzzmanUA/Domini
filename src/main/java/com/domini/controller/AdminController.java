package com.domini.controller;


import com.domini.model.Category;
import com.domini.model.User;
import com.domini.services.CategoryService;
import com.domini.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;
    private final CategoryService categoryService;

    //Users

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable Long id) {
        return new ResponseEntity<>(userService.updateUser(user, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public HttpStatus deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return HttpStatus.OK;
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    //Categories

    @GetMapping("/admin/categories")
    public String adminCategories(Model model){
        model.addAttribute("category", new Category());
        model.addAttribute("categories", categoryService.getAllCategories());
        return "admin_categories";
    }

    @PostMapping("/admin/categories")
    public String addCategory(@ModelAttribute("category") Category category){
        if (category.getParentCategory() != null && category.getParentCategory().getId() == null) {
            category.setParentCategory(null);
        }
        categoryService.saveCategory(category);
        return "redirect:/admin/categories";
    }

    @GetMapping("/admin/categories/edit/{id}")
    public String editCategory(@PathVariable Long id, Model model){
        Category category = categoryService.findById(id);
        if (category != null) {
            model.addAttribute("category", category);
            model.addAttribute("categories", categoryService.getAllCategories());
            return "edit_category";
        } else {
            return "redirect:/admin/categories";
        }
    }

    @PostMapping("/admin/categories/edit/{id}")
    public String updateCategory(@PathVariable Long id, @ModelAttribute("category") Category category){
        Category existingCategory = categoryService.findById(id);
        if (existingCategory != null) {
            existingCategory.setName(category.getName());
            existingCategory.setParentCategory(category.getParentCategory() != null ? categoryService.findById(category.getParentCategory().getId()) : null);
            categoryService.saveCategory(existingCategory);
        }
        return "redirect:/admin/categories";
    }

    @PostMapping("/admin/categories/delete/{id}")
    public String deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
        return "redirect:/admin/categories";
    }
}
