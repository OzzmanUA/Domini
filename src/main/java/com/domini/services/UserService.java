package com.domini.services;

import com.domini.dtos.WorkerInfoDTO;
import com.domini.exceptions.UserNotFoundException;
import com.domini.exceptions.UserAlreadyExistsException;
import com.domini.model.User;
import com.domini.repository.UserRepository;
import com.domini.repository.WorkerRepositoryCustom;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final WorkerRepositoryCustom workerRepository;

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
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public List<WorkerInfoDTO> filterWorkers(List<String> ratingLevels, Double minPrice, Double maxPrice, List<String> history, String location) {
        // Логика фильтрации работников на основании параметров
        return workerRepository.findWithFilters(ratingLevels, minPrice, maxPrice, history, location);
    }
}
