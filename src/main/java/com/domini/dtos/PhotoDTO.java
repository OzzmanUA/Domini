package com.domini.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhotoDTO {
    private Long id;
    private String name;
    private Long size;
    private String contentType;
    private String imagePath;
    private boolean isPreviewImage;
}
