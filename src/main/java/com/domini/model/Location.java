package com.domini.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String city;

    private String district;

    private String street;

    private String house;

    @OneToOne(mappedBy = "location")
    private User user;

    @OneToMany(mappedBy = "location")
    private List<Task> tasks;

    public Location(String country, String city) {
        this.country = country;
        this.city = city;
    }

    public Location(String country, String city, String district, String street, String house) {
        this.country = country;
        this.city = city;
        this.district = district;
        this.street = street;
        this.house = house;
    }
}
