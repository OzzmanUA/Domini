package com.domini.dtos;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class RegistrationUserDto {
    private String username;
    private String password;
    private String confirmPassword;
    private String email;
    private String phoneNumber;
}
