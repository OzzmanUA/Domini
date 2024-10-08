package com.domini.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Data
@RequiredArgsConstructor
@Getter
@Setter
@Table(name = "worker_category_price")
public class WorkerCategoryPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "private_information_id")
    private PrivateInformation privateInformation;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private Double servicePrice;
}
