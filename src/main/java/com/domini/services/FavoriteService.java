package com.domini.services;

import com.domini.dtos.WorkerInfoDTO;
import com.domini.model.Favorite;
import com.domini.model.User;
import com.domini.repository.FavoriteRepository;
import com.domini.repository.UserRepository;
import com.domini.utils.DTOConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;

    public void addFavorite(Long userId, Long workerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        if (favoriteRepository.findByUserAndWorker(user, worker).isEmpty()) {
            Favorite favorite = new Favorite();
            favorite.setUser(user);
            favorite.setWorker(worker);
            favoriteRepository.save(favorite);
        }
    }

    public void removeFavorite(Long userId, Long workerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        favoriteRepository.findByUserAndWorker(user, worker)
                .ifPresent(favoriteRepository::delete);
    }

    public List<WorkerInfoDTO> getFavorites(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Favorite> favorites = favoriteRepository.findByUser(user);

        return favorites.stream()
                .map(favorite -> DTOConverter.convertToWorkerInfoDTO(favorite.getWorker())) // Use your existing method for conversion
                .collect(Collectors.toList());
    }
}
