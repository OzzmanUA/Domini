package com.domini.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Blob;

@Entity
@Data
@RequiredArgsConstructor
public class  Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long size;

    private String contentType;

    private boolean isPreviewImage;

    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "private_information_id")
    private PrivateInformation privateInformation;

    @OneToOne(mappedBy = "photo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Category category;

    public String getUrl() {
        return imagePath;
    }

    public void setUrl(String url) {
        this.imagePath = url;
    }
}
