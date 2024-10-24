package com.domini.services;

import com.domini.model.Location;
import com.domini.repository.LocationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LocationService {
    private LocationRepository locationRepository;

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location addLocation(Location location) {
        if (!locationRepository.existsByCity(location.getCity())) {
            return locationRepository.save(location);
        }
        return null;
    }

    public Location updateLocation(Location location, Long id) {
        return locationRepository.findById(id).map(location1 -> {
            location1.setCity(location.getCity());
            location1.setDistrict(location.getDistrict());
            location1.setStreet(location.getStreet());
            return locationRepository.save(location1);
        }).orElseThrow(() -> new RuntimeException("Location not found"));
    }

    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }

    public Location getOrCreateLocation(String country, String city, String district, String street, String house) {
        // Пытаемся найти существующую локацию по ключевым полям
        Location existingLocation = locationRepository.findByCountryAndCityAndDistrictAndStreetAndHouse(country, city, district, street, house)
                .orElse(null);

        // Если локация существует, возвращаем её
        if (existingLocation != null) {
            return existingLocation;
        }

        // Если локация не найдена, создаем новую
        Location newLocation = new Location(country, city, district, street, house);
        return locationRepository.save(newLocation);
    }
}
