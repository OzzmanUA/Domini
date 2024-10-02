package com.domini.repository;

import com.domini.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findByStreet(String street);
    Location findByCity(String city);
    Location findByDistrict(String district);
    boolean existsByCity(String city);
}
