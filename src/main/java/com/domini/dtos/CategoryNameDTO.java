package com.domini.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CategoryNameDTO {
    private Long id;
    private String name;

    public CategoryNameDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
