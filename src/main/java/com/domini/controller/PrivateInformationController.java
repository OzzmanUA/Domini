package com.domini.controller;

import com.domini.dtos.PrivateInformationDTO;
import com.domini.model.Category;
import com.domini.model.PrivateInformation;
import com.domini.model.User;
import com.domini.repository.PrivateInformationRepository;
import com.domini.repository.UserRepository;
import com.domini.services.PrivateInformationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/private-information")
public class PrivateInformationController {
    private final UserRepository userRepository;
    private final PrivateInformationRepository privateInformationRepository;
    private PrivateInformationService privateInformationService;

    public PrivateInformationController(UserRepository userRepository, PrivateInformationRepository privateInformationRepository) {
        this.userRepository = userRepository;
        this.privateInformationRepository = privateInformationRepository;
    }

    // Эндпоинт для получения личной информации пользователя
    @GetMapping("/{userId}")
    public ResponseEntity<PrivateInformationDTO> getPrivateInformation(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            PrivateInformation privateInfo = userOpt.get().getPrivateInformation();
            PrivateInformationDTO dto = new PrivateInformationDTO(
                    privateInfo.getFirstName(),
                    privateInfo.getLastName(),
                    privateInfo.getAbout(),
                    privateInfo.getLanguage(),
                    privateInfo.getSkills(),
                    privateInfo.getEducation(),
                    privateInfo.getExperienceYears(),
                    privateInfo.getCategories().stream().map(Category::getId).toList() // Получаем ID категорий
            );
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Эндпоинт для редактирования личной информации пользователя
    @PutMapping("/{userId}")
    public ResponseEntity<Void> updatePrivateInformation(@PathVariable Long userId, @RequestBody PrivateInformationDTO privateInfoDTO) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            PrivateInformation privateInfo = user.getPrivateInformation();

            // Обновление личной информации
            privateInfo.setFirstName(privateInfoDTO.getFirstName());
            privateInfo.setLastName(privateInfoDTO.getLastName());
            privateInfo.setAbout(privateInfoDTO.getAbout());
            privateInfo.setLanguage(privateInfoDTO.getLanguage());
            privateInfo.setSkills(privateInfoDTO.getSkills());
            privateInfo.setEducation(privateInfoDTO.getEducation());
            privateInfo.setExperienceYears(privateInfoDTO.getExperienceYears());
            // Здесь можно добавить логику для обновления категорий, если требуется

            privateInformationRepository.save(privateInfo); // Сохраняем изменения
            return ResponseEntity.noContent().build(); // Возвращаем 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // Если пользователь не найден
        }
    }

    // Эндпоинт для добавления фотографии
    @PostMapping("/{id}/portfolio")
    public ResponseEntity<String> addPhoto(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            privateInformationService.addPhoto(id, file);
            return ResponseEntity.ok("Photo added successfully");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to upload photo: " + e.getMessage());
        }
    }

    // Эндпоинт для удаления фотографии
    @DeleteMapping("/{privateInfoId}/portfolio/{photoId}")
    public ResponseEntity<String> removePhoto(@PathVariable Long privateInfoId, @PathVariable Long photoId) {
        privateInformationService.removePhoto(privateInfoId, photoId);
        return ResponseEntity.ok("Photo removed successfully");
    }
}
