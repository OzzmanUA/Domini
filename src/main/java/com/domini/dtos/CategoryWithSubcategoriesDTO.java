package com.domini.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class CategoryWithSubcategoriesDTO {
    private Long id;
    private String name;
    private String imageUrl;
    private List<CategoryDTO> subcategories;

    public CategoryWithSubcategoriesDTO() {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.subcategories = subcategories;
    }
}
