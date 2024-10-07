package com.domini.services;

import com.domini.model.Photo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class PhotoUploadService {

    @Value("${upload.path}")  // Путь загрузки из application.properties
    private String uploadDir;

    public String uploadPhoto(MultipartFile file) throws IOException {
        // Проверка на пустой файл
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload empty file");
        }

        // Генерация уникального имени для файла
        String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        // Путь для сохранения файла
        Path filePath = Paths.get(uploadDir, uniqueFileName);

        // Логирование пути сохранения
        System.out.println("Saving file to: " + filePath.toString());

        // Создание директорий, если их нет
        Files.createDirectories(filePath.getParent());

        // Копирование файла в директорию
        Files.copy(file.getInputStream(), filePath);

        // Возвращаем относительный путь для сохранения в базе данных
        return "/uploads/images/" + uniqueFileName;
    }


}
