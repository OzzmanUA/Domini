package com.domini.repository;

import com.domini.dtos.WorkerInfoDTO;
import com.domini.enums.UserStatus;
import com.domini.model.Category;
import com.domini.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    List<User> findByPrivateInformation_CategoriesContains(Category category);
    @Query("SELECT u FROM User u " +
            "JOIN u.privateInformation pi " +
            "JOIN pi.workerCategoryPrices wcp " +
            "JOIN wcp.category c " +
            "WHERE (:categoryId IS NULL OR c.id = :categoryId) " +
            "AND (:minPrice IS NULL OR wcp.servicePrice >= :minPrice) " +
            "AND (:maxPrice IS NULL OR wcp.servicePrice <= :maxPrice) " +
            "AND (:experienceYears IS NULL OR pi.experienceYears >= :experienceYears) " +
            "AND (:country IS NULL OR u.location.country = :country) " +
            "AND (:city IS NULL OR u.location.city = :city)")
    List<User> findWithFilters(
            @Param("categoryId") Long categoryId,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("experienceYears") Integer experienceYears,
            @Param("country") String country,
            @Param("city") String city
    );
}
