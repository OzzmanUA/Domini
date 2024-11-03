package com.domini.controller;

import com.domini.dtos.CategoryWithPriceDTO;
import com.domini.dtos.PhotoDTO;
import com.domini.dtos.PrivateInformationDTO;
import com.domini.dtos.ReviewDTO;
import com.domini.enums.UserStatus;
import com.domini.model.*;
import com.domini.repository.PrivateInformationRepository;
import com.domini.repository.UserRepository;
import com.domini.repository.WorkerCategoryPriceRepository;
import com.domini.services.*;
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
    private UserService userService;

    @Autowired
    private WorkerCategoryPriceRepository workerCategoryPriceRepository;

    @Autowired
    private LocationService locationService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PrivateInformationService privateInformationService;

    @Autowired
    private PhotoUploadService photoUploadService;

    @Autowired
    private ReviewService reviewService;

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
    public ResponseEntity<?> getPrivateInformation(@RequestHeader("Authorization") String authorizationHeader) {
        System.out.println("Authorization Header: " + authorizationHeader);
        Optional<User> userOpt = getCurrentUser();

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            PrivateInformation privateInfo = user.getPrivateInformation();

            // Проверка, если личная информация отсутствует
            if (privateInfo == null || (privateInfo.getFirstName() == null && privateInfo.getLastName() == null)) {
                // Возвращаем сообщение с предложением заполнить информацию
                return ResponseEntity.status(204).body("Личная информация не заполнена. Пожалуйста, заполните данные.");
            }

            Location location = user.getLocation(); // Получаем локацию пользователя

            // Добавляем данные о локации в DTO
            String country = (location != null) ? location.getCountry() : null;
            String city = (location != null) ? location.getCity() : null;

            List<CategoryWithPriceDTO> categoryPrices = privateInfo.getWorkerCategoryPrices().stream()
                    .map(workerCategoryPrice -> new CategoryWithPriceDTO(
                            workerCategoryPrice.getCategory().getId(),  // Используем ID категории
                            workerCategoryPrice.getServicePrice()       // Цена услуги
                    )).toList();

            PrivateInformationDTO dto = new PrivateInformationDTO(
                    privateInfo.getFirstName(),
                    privateInfo.getLastName(),
                    privateInfo.getAbout(),
                    privateInfo.getLanguage(),
                    privateInfo.getSkills(),
                    privateInfo.getEducation(),
                    privateInfo.getExperienceYears(),
                    privateInfo.getCategories() != null ? privateInfo.getCategories().stream().map(Category::getId).toList() : null,
                    country,
                    city,
                    privateInfo.getAvatarUrl(),// != null ? privateInfo.getAvatarUrl() : "/uploads/images/avatar.png",
                    categoryPrices
            );
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(403).body(null); // Если пользователь не найден
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
            //privateInfo.setAvatarUrl(privateInfoDTO.getAvatarUrl());

            // Обновляем категории
            if (privateInfoDTO.getCategoryIds() != null && !privateInfoDTO.getCategoryIds().isEmpty()) {
                List<Category> updatedCategories = categoryService.findByIds(privateInfoDTO.getCategoryIds());
                privateInfo.setCategories(updatedCategories); // Обновляем список категорий
            } else {
                privateInfo.getCategories().clear(); // Очищаем категории, если список пуст
            }

            if (privateInfoDTO.getCountry() != null && privateInfoDTO.getCity() != null) {
                Location existingLocation = locationService.findByCountryAndCity(privateInfoDTO.getCountry(), privateInfoDTO.getCity());

                if (existingLocation != null) {
                    // Используем существующую локацию
                    user.setLocation(existingLocation);
                } else {
                    // Создаем новую локацию, если её нет
                    Location newLocation = new Location(privateInfoDTO.getCountry(), privateInfoDTO.getCity());
                    Location savedLocation = locationService.addLocation(newLocation);
                    user.setLocation(savedLocation);
                }
            }

            // Обновляем или добавляем записи WorkerCategoryPrice
            if (privateInfoDTO.getCategoryPrices() != null) {
                // Очищаем старые записи перед обновлением
                workerCategoryPriceRepository.deleteAll(privateInfo.getWorkerCategoryPrices());
                privateInfo.getWorkerCategoryPrices().clear();

                // Обрабатываем новые цены
                for (CategoryWithPriceDTO categoryWithPrice : privateInfoDTO.getCategoryPrices()) {
                    Category category = categoryService.findById(categoryWithPrice.getCategoryId());

                    WorkerCategoryPrice workerCategoryPrice = new WorkerCategoryPrice();
                    workerCategoryPrice.setPrivateInformation(privateInfo);
                    workerCategoryPrice.setCategory(category);
                    workerCategoryPrice.setServicePrice(categoryWithPrice.getServicePrice());

                    // Добавляем новую запись в список PrivateInformation
                    privateInfo.getWorkerCategoryPrices().add(workerCategoryPrice);
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

                System.out.println("Uploaded image URL: " + avatarUrl);

                Photo photo = new Photo();
                photo.setUrl(avatarUrl);
                photo = photoUploadService.save(photo);

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

    @PostMapping("/become-worker")
    public ResponseEntity<String> becomeWorker() {
        User currentUser = userService.getCurrentUser(); // Получаем текущего пользователя

        if (currentUser.isWorker()) {
            return ResponseEntity.badRequest().body("Вы уже являетесь работником.");
        }

        // Обновляем статус и флаг
        currentUser.setStatus(UserStatus.VERIFIED);
        currentUser.setWorker(true);

        userRepository.save(currentUser); // Сохраняем изменения

        return ResponseEntity.ok("Теперь вы работник!");
    }

    @GetMapping("/reviews/{workerId}")
    public ResponseEntity<List<ReviewDTO>> getUserReviews(@PathVariable Long workerId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByWorkerId(workerId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/portfolio")
    public ResponseEntity<?> getPortfolio(@RequestHeader("Authorization") String authorizationHeader) {
        Optional<User> userOpt = getCurrentUser();

        if (userOpt.isPresent()) {
            PrivateInformation privateInfo = userOpt.get().getPrivateInformation();

            if (privateInfo != null && !privateInfo.getPortfolio().isEmpty()) {
                List<PhotoDTO> portfolio = privateInfo.getPortfolio().stream()
                        .map(photo -> new PhotoDTO(
                                photo.getId(),
                                photo.getName(),
                                photo.getSize(),
                                photo.getContentType(),
                                photo.getImagePath(),
                                photo.isPreviewImage()
                        ))
                        .toList();

                return ResponseEntity.ok(portfolio);
            } else {
                return ResponseEntity.status(204).body("Портфолио отсутствует.");
            }
        } else {
            return ResponseEntity.status(403).body("Пользователь не найден.");
        }
    }
}
