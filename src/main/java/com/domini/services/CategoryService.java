package com.domini.services;

import com.domini.dtos.*;
import com.domini.model.*;
import com.domini.repository.CategoryRepository;
import com.domini.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryService{

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    // Вывод всех родительских категорий с только именами
    public List<CategoryNameDTO> getAllParentCategoriesDTO() {
        return categoryRepository.findByParentCategoryIsNull().stream()
                .map(this::convertToCategoryNameDTO)
                .collect(Collectors.toList());
    }

    // Сохранение категории
    public void saveCategory(Category category) {
        categoryRepository.save(category);
    }

    // Поиск категории по ID
    public Category findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    // Удаление категории
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    // Вывод всех категорий с подкатегориями (изображения только у родительских)
    public List<CategoryWithSubcategoriesDTO> getCategoriesWithSubcategories() {
        return categoryRepository.findByParentCategoryIsNull().stream()
                .map(this::convertToCategoryWithSubcategoriesDTO)
                .collect(Collectors.toList());
    }

    // Топ-10 подкатегорий с наибольшим числом задач
    public List<CategoryDTO> getTop10SubcategoriesWithMostTasks() {
        Pageable topTen = PageRequest.of(0, 10);
        return categoryRepository.findTop10SubcategoriesWithMostTasks(topTen).stream()
                .map(this::convertToCategoryWithImageDTO)
                .collect(Collectors.toList());
    }

    // Маппинг сущности в CategoryNameDTO (только id и name)
    private CategoryNameDTO convertToCategoryNameDTO(Category category) {
        return new CategoryNameDTO(category.getId(), category.getName());
    }

    // Маппинг сущности в CategoryDTO (с изображением)
    private CategoryDTO convertToCategoryWithImageDTO(Category category) {
        return new CategoryDTO(
                category.getId(),
                category.getName(),
                category.getPhoto() != null ? category.getPhoto().getUrl() : null
        );
    }

    // Маппинг категории с подкатегориями (родительские категории с подкатегориями, только родительские с изображениями)
    private CategoryWithSubcategoriesDTO convertToCategoryWithSubcategoriesDTO(Category category) {
        CategoryWithSubcategoriesDTO dto = new CategoryWithSubcategoriesDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setImageUrl(category.getPhoto() != null ? category.getPhoto().getUrl() : null);
        dto.setSubcategories(
                categoryRepository.findByParentCategory(category).stream()
                        .map(this::convertToCategoryWithImageDTO)
                        .collect(Collectors.toList())
        );
        return dto;
    }

    // Получение списка пользователей с информацией из WorkerInfoDTO, работающих в категории или подкатегории
    public List<WorkerInfoDTO> getWorkersByCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return userRepository.findByPrivateInformation_CategoriesContains(category).stream()
                .map(this::convertToWorkerInfoDTO)
                .collect(Collectors.toList());
    }

    // Получение краткой информации о работнике по его ID
    public WorkerInfoDTO getWorkerInfoById(Long workerId) {
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        return convertToWorkerInfoDTO(worker);
    }

    // Преобразование User в WorkerInfoDTO
    private WorkerInfoDTO convertToWorkerInfoDTO(User user) {
        PrivateInformation privateInfo = user.getPrivateInformation();
        Location location = user.getLocation();
        List<String> categories = privateInfo.getCategories().stream()
                .map(Category::getName)
                .collect(Collectors.toList());

        return new WorkerInfoDTO(
                user.getId(),
                privateInfo.getFirstName(),   // Имя из PrivateInformation
                privateInfo.getLastName(),    // Фамилия из PrivateInformation
                categories.get(0),            // Основная категория
                categories.size() > 1 ? categories.get(1) : null,  // Подкатегория (если есть)
                location.getCountry(),        // Страна
                location.getCity(),           // Город
                privateInfo.getServicePrice(), // Цена за услуги
                privateInfo.getAbout(),        // Описание
                categories                    // Все категории
        );
    }

    // Метод для преобразования сущности Review в ReviewDTO
    private ReviewDTO convertToReviewDTO(Review review) {
        return new ReviewDTO(
                review.getTask().getDescription(),          // Описание задания
                review.getOverallRating(),                  // Общая оценка
                review.getTask().getCompletionDate().toString(),       // Дата завершения задания (в формате гггг-мм-дд)
                review.getFeedback(),                       // Примечание от клиента
                review.getWorkQualityRating(),              // Оценка качества работы (если имеется)
                review.getPolitenessRating(),               // Оценка вежливости (если имеется)
                review.getPunctualityRating(),              // Оценка пунктуальности (если имеется)
                review.getClient().getPrivateInformation().getFirstName() // Имя клиента
        );
    }

    public WorkerDetailedDTO getWorkerDetailedInfoById(Long workerId) {
        User worker = userRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Работник не найден"));

        PrivateInformation privateInfo = worker.getPrivateInformation();
        Location location = worker.getLocation();

        // Собираем категории
        List<String> categories = privateInfo.getCategories().stream()
                .map(Category::getName)
                .collect(Collectors.toList());

        // Собираем изображения портфолио
        List<String> portfolioImages = privateInfo.getPortfolio().stream()
                .map(Photo::getUrl)
                .collect(Collectors.toList());

        // Собираем отзывы
        List<ReviewDTO> reviews = worker.getReviewsAsWorker().stream()
                .map(this::convertToReviewDTO)
                .collect(Collectors.toList());

        // Подсчитываем статистику по отзывам
        ReviewStatisticsDTO reviewStatistics = calculateReviewStatistics(worker);

        return new WorkerDetailedDTO(
                worker.getId(),
                privateInfo.getFirstName(),
                privateInfo.getLastName(),
                location.getCountry(),
                location.getCity(),
                calculateEarnings(worker),  // Рассчитываем общие заработки
                worker.getTasksAsExecutor().size(),  // Количество выполненных заданий
                categories,
                privateInfo.getAbout(),
                portfolioImages,
                reviews,
                reviewStatistics,
                privateInfo.getLanguage(),
                privateInfo.getSkills(),
                privateInfo.getEducation()
        );
    }

    private double calculateEarnings(User worker) {
        return worker.getTasksAsExecutor().stream()
                .mapToDouble(Task::getPrice) // Преобразуем в DoubleStream
                .sum(); // Суммируем значения
    }

    private ReviewStatisticsDTO calculateReviewStatistics(User worker) {
        List<Review> reviews = worker.getReviewsAsWorker();
        int reviewCount = reviews.size();

        if (reviewCount == 0) {
            return new ReviewStatisticsDTO(0, 0, 0, 0);  // Если нет отзывов, возвращаем нулевые оценки
        }

        float totalScore = 0;
        float totalQualityScore = 0;
        float totalPolitenessScore = 0;
        float totalPunctualityScore = 0;

        for (Review review : reviews) {
            totalScore += review.getOverallRating();
            // Допустим, что оценка качества, вежливости и пунктуальности хранятся в дополнительных полях:
            totalQualityScore += review.getWorkQualityRating();
            totalPolitenessScore += review.getPolitenessRating();
            totalPunctualityScore += review.getPunctualityRating();
        }

        return new ReviewStatisticsDTO(
                totalScore / reviewCount,
                totalQualityScore / reviewCount,
                totalPolitenessScore / reviewCount,
                totalPunctualityScore / reviewCount
        );
    }
}