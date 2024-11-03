package com.domini.repository;

import com.domini.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findByStreet(String street);
    Location findByCity(String city);
    Location findByDistrict(String district);
    boolean existsByCity(String city);
    Optional<Location> findByCountryAndCityAndDistrictAndStreetAndHouse(String country, String city, String district, String street, String house);
    Optional<Location> findByCountryAndCity(String country, String city);
}
