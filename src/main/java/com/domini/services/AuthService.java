package com.domini.services;

import com.domini.dtos.JwtRequestResponse;
import com.domini.enums.UserStatus;
import com.domini.model.User;
import com.domini.repository.UserRepository;
import com.domini.utils.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenUtils jwtTokenUtils;
    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtRequestResponse signUp(JwtRequestResponse jwtRequestResponse) {
        JwtRequestResponse response = new JwtRequestResponse();
        try {
            User user = new User();
            user.setUsername(jwtRequestResponse.getUsername());
            user.setEmail(jwtRequestResponse.getEmail());
            user.setPassword(passwordEncoder.encode(jwtRequestResponse.getPassword()));
            user.setRoles(jwtRequestResponse.getRole());
            user.setDateOfRegistration(String.valueOf(new Date()));
            user.setStatus(UserStatus.CREATED);
            user.setPhone(null);
            User savedUser = userRepository.save(user);
            if (savedUser != null && savedUser.getId()>0) {
                response.setUser(savedUser);
                response.setMessage("User successfully saved!");
                response.setStatusCode(200);
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public JwtRequestResponse signIn(JwtRequestResponse jwtRequestResponse) {
        JwtRequestResponse response = new JwtRequestResponse();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    jwtRequestResponse.getUsername(),
                    jwtRequestResponse.getPassword()
                    )
            );
            var user = userRepository.findByEmail(jwtRequestResponse.getEmail()).orElseThrow();
            System.out.println("User is: "+user);
            var jwt = jwtTokenUtils.generateToken(user);
            var refreshToken = jwtTokenUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully signed in!");
        }catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }return response;
    }

    public JwtRequestResponse refreshToken(JwtRequestResponse refreshTokenResponse) {
        JwtRequestResponse response = new JwtRequestResponse();
        String username = jwtTokenUtils.getUsernameFromToken(refreshTokenResponse.getToken());
        User user = userRepository.findByEmail(username).orElseThrow();
        if(jwtTokenUtils.validateToken(refreshTokenResponse.getToken(), user)){
            var jwt = jwtTokenUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenResponse.getToken());
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully refreshed!");
        }
        response.setStatusCode(500);
        return response;
    }

}
