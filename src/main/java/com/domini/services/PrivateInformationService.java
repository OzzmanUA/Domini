package com.domini.services;

import com.domini.model.Photo;
import com.domini.model.PrivateInformation;
import com.domini.repository.PrivateInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PrivateInformationService {
    private final PrivateInformationRepository privateInformationRepository;

    @Autowired
    private PhotoUploadService photoUploadService;

    public PrivateInformationService(PrivateInformationRepository privateInformationRepository) {
        this.privateInformationRepository = privateInformationRepository;
    }

    // Метод для добавления фотографии
    public void addPhoto(Long privateInfoId, MultipartFile file) throws IOException {
        PrivateInformation privateInfo = privateInformationRepository.findById(privateInfoId)
                .orElseThrow(() -> new RuntimeException("Private information not found"));

        // Загружаем фото и получаем путь к нему
        String imagePath = photoUploadService.uploadPhoto(file);

        // Создаем новый объект Photo
        Photo photo = new Photo();
        photo.setImagePath(imagePath);
        photo.setName(file.getOriginalFilename());
        photo.setSize(file.getSize());
        photo.setContentType(file.getContentType());
        photo.setPreviewImage(false); // Установите флаг, если это предварительное изображение

        privateInfo.addPhoto(photo);
        privateInformationRepository.save(privateInfo);
    }

    // Метод для удаления фотографии
    public void removePhoto(Long privateInfoId, Long photoId) {
        PrivateInformation privateInfo = privateInformationRepository.findById(privateInfoId)
                .orElseThrow(() -> new RuntimeException("Private information not found"));

        Photo photo = privateInfo.getPortfolio().stream()
                .filter(p -> p.getId().equals(photoId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Photo not found"));

        privateInfo.removePhoto(photo);
        privateInformationRepository.save(privateInfo);
    }


}
