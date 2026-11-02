package com.placeprep.controller;

import com.placeprep.dto.ApiResponse;
import com.placeprep.dto.AuthResponse;
import com.placeprep.dto.LoginRequest;
import com.placeprep.dto.RegisterRequest;
import com.placeprep.model.User;
import com.placeprep.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication REST Controller.
 * Direct equivalent of Node.js authRoutes.js:
 * - router.post('/register', register) -> @PostMapping("/register")
 * - router.post('/login', login)       -> @PostMapping("/login")
 * - router.get('/me', protect, getMe)  -> @GetMapping("/me")
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Equivalent to: router.post('/register', register)
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(ApiResponse.success("User registered successfully", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * Equivalent to: router.post('/login', login)
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(ApiResponse.success("Login successful", response));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * Equivalent to: router.get('/me', protect, getMe)
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getMe(@RequestParam(value = "userId", required = false, defaultValue = "1") Long userId) {
        User user = authService.getMe(userId);
        if (user != null) {
            return ResponseEntity.ok(ApiResponse.success(user));
        }
        return ResponseEntity.status(404).body(ApiResponse.error("User not found"));
    }
}
