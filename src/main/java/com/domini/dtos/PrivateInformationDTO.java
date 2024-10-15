package com.domini.dtos;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrivateInformationDTO {
    private String firstName;
    private String lastName;
    private String about;
    private String language;
    private String skills;
    private String education;
    private int experienceYears;
    private List<Long> categoryIds;
    private String country;
    private String city;
}
