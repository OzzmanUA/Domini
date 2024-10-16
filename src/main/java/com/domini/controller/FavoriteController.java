package com.domini.controller;

import com.domini.dtos.WorkerInfoDTO;
import com.domini.services.FavoriteService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
@AllArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping("/add")
    public ResponseEntity<String> addFavorite(@RequestParam Long userId, @RequestParam Long workerId) {
        favoriteService.addFavorite(userId, workerId);
        return ResponseEntity.ok("Worker added to favorites");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFavorite(@RequestParam Long userId, @RequestParam Long workerId) {
        favoriteService.removeFavorite(userId, workerId);
        return ResponseEntity.ok("Worker removed from favorites");
    }

    @GetMapping("/list")
    public List<WorkerInfoDTO> getFavorites(@RequestParam Long userId) {
        return favoriteService.getFavorites(userId);
    }
}
