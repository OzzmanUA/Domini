package com.domini.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String city;

    private String district;

    private String street;

    @OneToOne(mappedBy = "location")
    private User user;

    @OneToMany(mappedBy = "location")
    private List<Task> tasks;

    public Location(String city) {
        this.city = city;
    }
}
