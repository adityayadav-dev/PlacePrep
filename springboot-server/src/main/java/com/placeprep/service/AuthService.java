package com.placeprep.service;

import com.placeprep.dto.AuthResponse;
import com.placeprep.dto.LoginRequest;
import com.placeprep.dto.RegisterRequest;
import com.placeprep.model.User;
import com.placeprep.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(), // In production, hash via BCryptPasswordEncoder
                request.getRole() != null ? request.getRole() : "student"
        );

        User savedUser = userRepository.save(user);
        String mockToken = "jwt_token_placeprep_spring_" + savedUser.getId();
        return new AuthResponse(mockToken, savedUser);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String mockToken = "jwt_token_placeprep_spring_" + user.getId();
        return new AuthResponse(mockToken, user);
    }

    public User getMe(Long userId) {
        return userRepository.findById(userId)
                .orElseGet(() -> userRepository.findAll().stream().findFirst().orElse(null));
    }
}
