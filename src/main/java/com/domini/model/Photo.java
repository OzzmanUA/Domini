package com.domini.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

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

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "private_information_id")
    private PrivateInformation privateInformation;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToOne(mappedBy = "photo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Category category;

    public String getUrl() {
        return imagePath;
    }

    public void setUrl(String url) {
        this.imagePath = url;
    }
}
