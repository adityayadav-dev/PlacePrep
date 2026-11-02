package com.placeprep.controller;

import com.placeprep.dto.ApiResponse;
import com.placeprep.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Dashboard & Analytics REST Controller.
 * Direct equivalent of Node.js dashboardRoutes.js:
 * - router.get('/', protect, getDashboard) -> @GetMapping
 */
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    /**
     * Equivalent to: router.get('/', protect, getDashboard)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard(
            @RequestParam(value = "userId", required = false, defaultValue = "1") Long userId) {
        Map<String, Object> stats = dashboardService.getDashboardStats(userId);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
