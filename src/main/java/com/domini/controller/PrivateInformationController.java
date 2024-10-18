package com.domini.controller;

import com.domini.dtos.PrivateInformationDTO;
import com.domini.model.Category;
import com.domini.model.Location;
import com.domini.model.PrivateInformation;
import com.domini.model.User;
import com.domini.repository.PrivateInformationRepository;
import com.domini.repository.UserRepository;
import com.domini.services.CategoryService;
import com.domini.services.LocationService;
import com.domini.services.PhotoUploadService;
import com.domini.services.PrivateInformationService;
import com.domini.utils.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/private-information")
public class PrivateInformationController {

    private final UserRepository userRepository;
    private final PrivateInformationRepository privateInformationRepository;

    @Autowired
    private LocationService locationService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PrivateInformationService privateInformationService;

    @Autowired
    private PhotoUploadService photoUploadService;

    public PrivateInformationController(UserRepository userRepository, PrivateInformationRepository privateInformationRepository) {
        this.userRepository = userRepository;
        this.privateInformationRepository = privateInformationRepository;
    }

    // Вспомогательный метод для получения текущего пользователя из контекста безопасности
    private Optional<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username);
    }

    // Эндпоинт для получения личной информации текущего пользователя
    @GetMapping
    public ResponseEntity<PrivateInformationDTO> getPrivateInformation(@RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("Authorization Header: " + authorizationHeader);
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            PrivateInformation privateInfo = user.getPrivateInformation();
            Location location = user.getLocation(); // Получаем локацию пользователя

            // Добавляем данные о локации в DTO
            String country = (location != null) ? location.getCountry() : null;
            String city = (location != null) ? location.getCity() : null;

            PrivateInformationDTO dto = new PrivateInformationDTO(
                    privateInfo.getFirstName(),
                    privateInfo.getLastName(),
                    privateInfo.getAbout(),
                    privateInfo.getLanguage(),
                    privateInfo.getSkills(),
                    privateInfo.getEducation(),
                    privateInfo.getExperienceYears(),
                    privateInfo.getCategories().stream().map(Category::getId).toList(),
                    privateInfo.getAvatarUrl(),
                    country, // Страна из локации
                    city     // Город из локации
            );
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(403).body(null); // Если пользователь не найден, возвращаем ошибку авторизации
        }
    }

    // Эндпоинт для редактирования личной информации текущего пользователя
    @PutMapping
    public ResponseEntity<Void> updatePrivateInformation(@RequestBody PrivateInformationDTO privateInfoDTO) {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            PrivateInformation privateInfo = user.getPrivateInformation();

            // Обновляем личную информацию
            privateInfo.setFirstName(privateInfoDTO.getFirstName());
            privateInfo.setLastName(privateInfoDTO.getLastName());
            privateInfo.setAbout(privateInfoDTO.getAbout());
            privateInfo.setLanguage(privateInfoDTO.getLanguage());
            privateInfo.setSkills(privateInfoDTO.getSkills());
            privateInfo.setEducation(privateInfoDTO.getEducation());
            privateInfo.setExperienceYears(privateInfoDTO.getExperienceYears());
            privateInfo.setAvatarUrl(privateInfoDTO.getAvatarUrl());

            // Обновляем категории
            if (privateInfoDTO.getCategoryIds() != null && !privateInfoDTO.getCategoryIds().isEmpty()) {
                List<Category> updatedCategories = categoryService.findByIds(privateInfoDTO.getCategoryIds());
                privateInfo.setCategories(updatedCategories); // Обновляем список категорий
            } else {
                privateInfo.getCategories().clear(); // Очищаем категории, если список пуст
            }

            // Обновляем или создаем новую локацию
            if (privateInfoDTO.getCountry() != null && privateInfoDTO.getCity() != null) {
                Location location = user.getLocation();
                if (location != null) {
                    // Обновляем существующую локацию
                    location.setCountry(privateInfoDTO.getCountry());
                    location.setCity(privateInfoDTO.getCity());
                } else {
                    // Создаем новую локацию, если её нет
                    location = new Location(privateInfoDTO.getCountry(), privateInfoDTO.getCity());
                    Location savedLocation = locationService.addLocation(location);
                    user.setLocation(savedLocation); // Связываем новую локацию с пользователем
                }
            }

            // Сохраняем изменения
            privateInformationRepository.save(privateInfo);
            userRepository.save(user); // Сохраняем изменения пользователя с новой или обновленной локацией

            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(403).build(); // Если пользователь не найден
        }
    }

    // Эндпоинт для добавления фотографии
    @PostMapping("/portfolio")
    public ResponseEntity<String> addPhoto(@RequestParam("file") MultipartFile file) {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isPresent()) {
            try {
                privateInformationService.addPhoto(userOpt.get().getId(), file);
                return ResponseEntity.ok("Photo added successfully");
            } catch (IOException e) {
                return ResponseEntity.badRequest().body("Failed to upload photo: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(403).body("User not found or not authorized");
        }
    }

    // Эндпоинт для удаления фотографии
    @DeleteMapping("/portfolio/{photoId}")
    public ResponseEntity<String> removePhoto(@PathVariable Long photoId) {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isPresent()) {
            privateInformationService.removePhoto(userOpt.get().getId(), photoId);
            return ResponseEntity.ok("Photo removed successfully");
        } else {
            return ResponseEntity.status(403).body("User not found or not authorized");
        }
    }

    // Эндпоинт для загрузки аватара
    @PostMapping("/avatar")
    public ResponseEntity<Void> uploadAvatar(@RequestParam("file") MultipartFile file, @RequestHeader("Authorization") String authorizationHeader) {
        Optional<User> userOpt = getCurrentUser();
        if (userOpt.isPresent()) {
            try {
                // Загружаем фото и получаем URL
                String avatarUrl = photoUploadService.uploadPhoto(file);

                // Обновляем аватар пользователя
                PrivateInformation privateInfo = userOpt.get().getPrivateInformation();
                privateInfo.setAvatarUrl(avatarUrl);

                // Сохраняем изменения
                privateInformationRepository.save(privateInfo);

                return ResponseEntity.noContent().build();
            } catch (IOException e) {
                // Если произошла ошибка при загрузке
                return ResponseEntity.status(500).build();
            }
        } else {
            return ResponseEntity.status(403).build(); // Если пользователь не найден
        }
    }
}
