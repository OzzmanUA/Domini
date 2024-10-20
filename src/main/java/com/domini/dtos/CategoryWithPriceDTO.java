package com.domini.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryWithPriceDTO {
    private Long categoryId;      // ID категории
    private Double servicePrice;    // Цена за услуги в этой категории
}
