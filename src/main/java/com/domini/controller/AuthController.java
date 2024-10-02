package com.domini.controller;

import com.domini.dtos.JwtRequestResponse;
import com.domini.services.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<JwtRequestResponse> signUp(@RequestBody JwtRequestResponse jwtSignUpRequest) {
        return ResponseEntity.ok(authService.signUp(jwtSignUpRequest));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtRequestResponse> signIn(@RequestBody JwtRequestResponse jwtSignInRequest) {
        return ResponseEntity.ok(authService.signIn(jwtSignInRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtRequestResponse> refreshToken(@RequestBody JwtRequestResponse jwtRefreshRequest) {
        return ResponseEntity.ok(authService.signIn(jwtRefreshRequest));
    }

}
