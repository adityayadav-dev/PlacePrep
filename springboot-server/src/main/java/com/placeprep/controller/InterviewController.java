package com.placeprep.controller;

import com.placeprep.dto.ApiResponse;
import com.placeprep.model.InterviewQuestion;
import com.placeprep.service.InterviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Interview Preparation REST Controller.
 * Direct equivalent of Node.js interviewRoutes.js:
 * - router.get('/', protect, getQuestions)              -> @GetMapping
 * - router.get('/:id', protect, getQuestion)            -> @GetMapping("/{id}")
 * - router.post('/:id/complete', protect, markCompleted)-> @PostMapping("/{id}/complete")
 */
@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    /**
     * Equivalent to: router.get('/', protect, getQuestions)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getQuestions(
            @RequestParam(value = "userId", required = false, defaultValue = "1") Long userId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty) {
        List<Map<String, Object>> questions = interviewService.getQuestionsWithUserStatus(userId, category, difficulty);
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    /**
     * Equivalent to: router.get('/:id', protect, getQuestion)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InterviewQuestion>> getQuestion(@PathVariable Long id) {
        return interviewService.getQuestionById(id)
                .map(q -> ResponseEntity.ok(ApiResponse.success(q)))
                .orElse(ResponseEntity.status(404).body(ApiResponse.error("Interview question not found")));
    }

    /**
     * Equivalent to: router.post('/:id/complete', protect, markCompleted)
     */
    @PostMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<Map<String, Object>>> markCompleted(
            @PathVariable Long id,
            @RequestParam(value = "userId", required = false, defaultValue = "1") Long userId) {
        Map<String, Object> result = interviewService.toggleInterviewCompleted(userId, id);
        return ResponseEntity.ok(ApiResponse.success("Interview question progress updated", result));
    }
}
