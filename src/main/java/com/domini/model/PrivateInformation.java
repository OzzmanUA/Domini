package com.domini.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
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

    private Double servicePrice;  // Цена за услуги в категории

    @ManyToMany
    @JoinTable(
            name = "private_information_categories",
            joinColumns = @JoinColumn(name = "private_information_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;  // Категории/подкатегории, в которых работает пользователь

    @OneToOne(mappedBy = "privateInformation")
    private User user;

    @OneToMany(mappedBy = "privateInformation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Photo> portfolio;
}
