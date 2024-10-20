package com.domini.services;

import com.domini.exceptions.UserNotFoundException;
import com.domini.exceptions.UserAlreadyExistsException;
import com.domini.model.User;
import com.domini.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public User createUser(User user) {
        if(userAlreadyExists(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        return userRepository.save(User.builder().username(user.getUsername()).password(user.getPassword()).email(user.getEmail()).roles("ADMIN").build());
    }

    private boolean userAlreadyExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(User user, Long id) {
        return userRepository.findById(id).map(st -> {
            st.setUsername(user.getUsername());
            st.setPassword(user.getPassword());
            st.setEmail(user.getEmail());
            st.setRoles(user.getRoles());
            return userRepository.save(st);
        }).orElseThrow(()->new UserNotFoundException("Sorry, user could not be found"));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(()->new UserNotFoundException("Sorry, user could not be found"));
    }

    public void deleteUserById(Long id) {
        if(!userRepository.existsById(id)) {
            throw new UserNotFoundException("Sorry, user could not be found");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        System.out.println("Loading user with roles: " + user.getAuthorities());
        return user;
    }

    //Получение информации от текущем пользователе
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
}
