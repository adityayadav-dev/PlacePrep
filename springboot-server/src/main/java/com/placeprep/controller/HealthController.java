package com.placeprep.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Health check controller.
 * Direct equivalent of Node.js:
 * app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'PlacePrep API is running' }))
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "PlacePrep Spring Boot API Engine is running");
        response.put("runtime", "Java " + System.getProperty("java.version"));
        return ResponseEntity.ok(response);
    }
}
