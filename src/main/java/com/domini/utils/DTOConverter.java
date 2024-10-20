package com.domini.utils;

import com.domini.dtos.CategoryWithPriceDTO;
import com.domini.dtos.WorkerInfoDTO;
import com.domini.model.Category;
import com.domini.model.PrivateInformation;
import com.domini.model.User;

import java.util.List;
import java.util.stream.Collectors;

public class DTOConverter {
    public static WorkerInfoDTO convertToWorkerInfoDTO(User user) {
        PrivateInformation privateInfo = user.getPrivateInformation();
        List<String> categoryNames = privateInfo.getCategories().stream()
                .map(Category::getName)
                .collect(Collectors.toList());

        List<CategoryWithPriceDTO> categoriesWithPrices = privateInfo.getWorkerCategoryPrices().stream()
                .map(workerCategoryPrice -> new CategoryWithPriceDTO(
                        workerCategoryPrice.getCategory().getId(),
                        workerCategoryPrice.getServicePrice()))
                .collect(Collectors.toList());

        return new WorkerInfoDTO(
                user.getId(),
                user.getPrivateInformation().getAvatarUrl(),
                privateInfo.getFirstName(),
                privateInfo.getLastName(),
                categoryNames,
                null,
                user.getLocation().getCountry(),
                user.getLocation().getCity(),
                categoriesWithPrices,
                privateInfo.getAbout(),
                privateInfo.getSkillLevel()
        );
    }
}
