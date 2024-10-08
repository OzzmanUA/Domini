package com.domini.repository;

import com.domini.dtos.WorkerInfoDTO;
import com.domini.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Repository
public class WorkerRepositoryImpl implements WorkerRepositoryCustom{
    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<WorkerInfoDTO> findWithFilters(List<String> ratingLevels, Double minPrice, Double maxPrice, List<String> history, String location) {
        StringBuilder queryStr = new StringBuilder("SELECT w FROM User w JOIN w.privateInformation pi LEFT JOIN Review r ON r.worker = w WHERE w.isWorker = true");
        List<String> conditions = new ArrayList<>();

        // Фильтр по уровню рейтинга (общая оценка работника из отзывов)
        if (!CollectionUtils.isEmpty(ratingLevels)) {
            conditions.add("r.overallRating IN :ratingLevels");
        }

        // Фильтр по диапазону цены услуг
        if (minPrice != null) {
            conditions.add("pi.servicePrice >= :minPrice");
        }
        if (maxPrice != null) {
            conditions.add("pi.servicePrice <= :maxPrice");
        }

        // Фильтр по истории заказов (количество выполненных заказов)
        if (!CollectionUtils.isEmpty(history)) {
            conditions.add("w.tasksAsExecutor.size IN :history");
        }

        // Фильтр по локации (из таблицы локации)
        if (StringUtils.hasText(location)) {
            conditions.add("w.location.city = :location");
        }

        // Собираем все условия в один запрос
        if (!conditions.isEmpty()) {
            queryStr.append(" AND ").append(String.join(" AND ", conditions));
        }

        TypedQuery<User> query = entityManager.createQuery(queryStr.toString(), User.class);

        // Установка параметров
        if (!CollectionUtils.isEmpty(ratingLevels)) {
            query.setParameter("ratingLevels", ratingLevels);
        }
        if (minPrice != null) {
            query.setParameter("minPrice", minPrice);
        }
        if (maxPrice != null) {
            query.setParameter("maxPrice", maxPrice);
        }
        if (!CollectionUtils.isEmpty(history)) {
            query.setParameter("history", history);
        }
        if (StringUtils.hasText(location)) {
            query.setParameter("location", location);
        }

        return query.getResultList();
    }
}
