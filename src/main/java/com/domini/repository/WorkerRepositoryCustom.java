package com.domini.repository;

import com.domini.dtos.WorkerInfoDTO;
import com.domini.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkerRepositoryCustom {
    @Query("SELECT new com.domini.dtos.WorkerInfoDTO(u.id, pi.firstName, pi.lastName, " +
            "cat.name, subcat.name, loc.country, loc.city, pi.servicePrice, pi.about, " +
            "cat.name) " +
            "FROM User u " +
            "JOIN u.privateInformation pi " +
            "JOIN pi.categories cat " +
            "JOIN u.location loc " +
            "WHERE (u.ratingLevel IN :ratingLevels) " +
            "AND (pi.servicePrice BETWEEN :minPrice AND :maxPrice) " +
            "AND (u.clientHistory IN :history) " +
            "AND (loc.city = :location)")
    List<WorkerInfoDTO> findWithFilters(@Param("ratingLevels") List<String> ratingLevels,
                                        @Param("minPrice") Double minPrice,
                                        @Param("maxPrice") Double maxPrice,
                                        @Param("history") List<String> history,
                                        @Param("location") String location);
}
