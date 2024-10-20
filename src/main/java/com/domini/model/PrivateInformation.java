package com.domini.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@Getter
@Setter
@Table(name = "private_information")
public class PrivateInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    @Column(length = 1200)
    private String about;

    private String language;

    private String skills;

    private String education;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "privateInformation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkerCategoryPrice> workerCategoryPrices;  // Список категорий с ценами

    private int experienceYears;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany
    @JoinTable(
            name = "private_information_categories",
            joinColumns = @JoinColumn(name = "private_information_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;  // Категории/подкатегории, в которых работает пользователь

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToOne(mappedBy = "privateInformation")
    private User user;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "privateInformation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Photo> portfolio = new ArrayList<>(); // Инициализируем список

    // Метод для добавления фотографии
    public void addPhoto(Photo photo) {
        photo.setPrivateInformation(this); // Устанавливаем связь с PrivateInformation
        portfolio.add(photo); // Добавляем фото в портфолио
    }

    // Метод для удаления фотографии
    public void removePhoto(Photo photo) {
        photo.setPrivateInformation(null); // Удаляем связь с PrivateInformation
        portfolio.remove(photo); // Удаляем фото из портфолио
    }

    // Метод для определения уровня навыков на основе лет опыта
    public String getSkillLevel() {
        if (experienceYears < 3) {
            return "Начальный уровень";
        } else if (experienceYears <= 5) {
            return "Средний уровень";
        } else {
            return "Эксперт";
        }
    }

    // Метод для добавления или обновления стоимости услуг для категории
    public void setServicePriceForCategory(Category category, Double price) {
        // Проверяем, существует ли уже запись для данной категории
        WorkerCategoryPrice existingPrice = workerCategoryPrices.stream()
                .filter(workerCategoryPrice -> workerCategoryPrice.getCategory().equals(category))
                .findFirst()
                .orElse(null);

        if (existingPrice != null) {
            // Если запись найдена, обновляем цену
            existingPrice.setServicePrice(price);
        } else {
            // Если записи нет, создаем новую запись
            WorkerCategoryPrice newPrice = new WorkerCategoryPrice();
            newPrice.setCategory(category);
            newPrice.setPrivateInformation(this); // Устанавливаем связь с PrivateInformation
            newPrice.setServicePrice(price);
            workerCategoryPrices.add(newPrice); // Добавляем запись в список
        }
    }
}
