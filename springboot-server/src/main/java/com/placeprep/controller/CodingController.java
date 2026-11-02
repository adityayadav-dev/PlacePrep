package com.placeprep.controller;

import com.placeprep.dto.ApiResponse;
import com.placeprep.model.CodingProblem;
import com.placeprep.service.CodingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Coding Challenges REST Controller.
 * Direct equivalent of Node.js codingRoutes.js:
 * - router.get('/', protect, getProblems)            -> @GetMapping
 * - router.get('/:id', protect, getProblem)          -> @GetMapping("/{id}")
 * - router.post('/:id/complete', protect, markSolved)-> @PostMapping("/{id}/complete")
 */
@RestController
@RequestMapping("/api/coding")
public class CodingController {

    private final CodingService codingService;

    public CodingController(CodingService codingService) {
        this.codingService = codingService;
    }

    /**
     * Equivalent to: router.get('/', protect, getProblems)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getProblems(
            @RequestParam(value = "userId", required = false, defaultValue = "1") Long userId,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String difficulty) {
        List<Map<String, Object>> problems = codingService.getProblemsWithUserStatus(userId, topic, difficulty);
        return ResponseEntity.ok(ApiResponse.success(problems));
    }

    /**
     * Equivalent to: router.get('/:id', protect, getProblem)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CodingProblem>> getProblem(@PathVariable Long id) {
        return codingService.getProblemById(id)
                .map(p -> ResponseEntity.ok(ApiResponse.success(p)))
                .orElse(ResponseEntity.status(404).body(ApiResponse.error("Coding problem not found")));
    }

    /**
     * Equivalent to: router.post('/:id/complete', protect, markSolved)
     */
    @PostMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<Map<String, Object>>> markSolved(
            @PathVariable Long id,
            @RequestParam(value = "userId", required = false, defaultValue = "1") Long userId) {
        Map<String, Object> result = codingService.toggleProblemSolved(userId, id);
        return ResponseEntity.ok(ApiResponse.success("Problem progress updated", result));
    }
}
