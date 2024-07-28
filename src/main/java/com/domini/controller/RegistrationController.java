package com.domini.controller;

import com.domini.dtos.RegistrationUserDto;
import com.domini.model.User;
import com.domini.services.IUserService;
import com.domini.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registration")
@AllArgsConstructor
public class RegistrationController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity<List<User>> getAllUsers() {
//        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
//    }

//    @PutMapping
//    public ResponseEntity<User> updateUser(@RequestBody User user) {
//        return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
//    }

//    @DeleteMapping("/{id}")
//    public HttpStatus deleteUser(@PathVariable Long id) {
//        userService.deleteUserById(id);
//        return HttpStatus.OK;
//    }

}
