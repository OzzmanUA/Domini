package com.domini.controller;


import com.domini.model.User;
import com.domini.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final IUserService userService;

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
}
