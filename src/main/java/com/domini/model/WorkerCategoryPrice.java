package com.domini.model;

import jakarta.persistence.*;
import lombok.*;

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

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    @JoinColumn(name = "private_information_id")
    private PrivateInformation privateInformation;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private Double servicePrice;
}
