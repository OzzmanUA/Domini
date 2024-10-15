package com.domini.repository;

import com.domini.model.Task;
import com.domini.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByClient(User client);

    List<Task> findByWorker(User worker);

    @Query("SELECT t FROM Task t " +
            "JOIN t.location loc " +
            "WHERE t.category.id = :categoryId" +
            " AND (:minPrice IS NULL OR t.price >= :minPrice)" +
            " AND (:maxPrice IS NULL OR t.price <= :maxPrice)" +
            " AND (:country IS NULL OR loc.country = :country)" +
            " AND (:city IS NULL OR loc.city = :city)")
    List<Task> findTasksInCategoryWithFilters(@Param("categoryId") Long categoryId,
                                              @Param("minPrice") Double minPrice,
                                              @Param("maxPrice") Double maxPrice,
                                              @Param("country") String country,
                                              @Param("city") String city);
}
