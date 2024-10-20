package com.domini.services;

import com.domini.dtos.ReviewDTO;
import com.domini.dtos.ReviewStatisticsDTO;
import com.domini.model.Review;
import com.domini.model.Task;
import com.domini.model.User;
import com.domini.repository.ReviewRepository;
import com.domini.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<ReviewDTO> getReviewsByWorkerId(Long workerId) {
        List<Review> reviews = reviewRepository.findByWorkerId(workerId);

        return reviews.stream().map(review -> {
            Task task = taskRepository.findById(review.getTaskId()).orElseThrow();
            return new ReviewDTO(
                    task.getDescription(),
                    review.getOverallRating(),
                    review.getTask().getCompletionDate().toString(),
                    review.getFeedback(),
                    review.getWorkQualityRating(),
                    review.getPolitenessRating(),
                    review.getPunctualityRating(),
                    review.getClient().getPrivateInformation().getFirstName()
            );
        }).collect(Collectors.toList());
    }

    public void addReview(ReviewDTO reviewDTO, Task task, User client, User worker) {
        // Создаем новый объект Review
        Review review = new Review();

        // Заполняем поля из DTO
        review.setOverallRating(reviewDTO.getOverallRating());
        review.setWorkQualityRating(reviewDTO.getWorkQualityRating());
        review.setPolitenessRating(reviewDTO.getPolitenessRating());
        review.setPunctualityRating(reviewDTO.getPunctualityRating());
        review.setFeedback(reviewDTO.getFeedback());

        // Привязываем задачу, клиент и работника к отзыву
        review.setTask(task);
        review.setClient(client);
        review.setWorker(worker);

        // Сохраняем отзыв в базе данных через репозиторий
        reviewRepository.save(review);
    }
}
