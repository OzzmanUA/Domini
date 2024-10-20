package com.domini.repository;

import com.domini.model.WorkerCategoryPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerCategoryPriceRepository extends JpaRepository<WorkerCategoryPrice, Long> {
}
