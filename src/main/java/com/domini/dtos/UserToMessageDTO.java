package com.domini.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserToMessageDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String avatarUrl;
}
