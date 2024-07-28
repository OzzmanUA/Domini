package com.domini.services;

import com.domini.dtos.RegistrationUserDto;
import com.domini.model.User;

import java.util.List;

public interface IUserService {

    User createUser(User user);
    List<User> getAllUsers();
    User updateUser(User user, Long id);
    User getUserById(Long id);
    void deleteUserById(Long id);
}
