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

    @Column(length = 1200)
    private String about;

    private String language;

    private String skills;

    private String education;

    @OneToOne(mappedBy = "privateInformation")
    private User user;

    @OneToMany(mappedBy = "privateInformation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Photo> portfolio;
}
