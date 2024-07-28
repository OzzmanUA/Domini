package com.domini.services;

import com.domini.dtos.RegistrationUserDto;
import com.domini.exceptions.UserNotFoundException;
import com.domini.exceptions.userAlreadyExistsException;
import com.domini.model.User;
import com.domini.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;

    @Override
    public User createUser(User user) {
        if(userAlreadyExists(user.getEmail())){
            throw new userAlreadyExistsException(user.getEmail() + " already exists");
        }
        return userRepository.save(User.builder().username(user.getUsername()).password(user.getPassword()).email(user.getEmail()).roles("ADMIN").build());
    }

    private boolean userAlreadyExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user, Long id) {
        return userRepository.findById(id).map(st -> {
            st.setUsername(user.getUsername());
            st.setPassword(user.getPassword());
            st.setEmail(user.getEmail());
            st.setRoles(user.getRoles());
            return userRepository.save(st);
        }).orElseThrow(()->new UserNotFoundException("Sorry, user could not be found"));
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(()->new UserNotFoundException("Sorry, user could not be found"));
    }

    @Override
    public void deleteUserById(Long id) {
        if(!userRepository.existsById(id)) {
            throw new UserNotFoundException("Sorry, user could not be found");
        }
        userRepository.deleteById(id);
    }

}
