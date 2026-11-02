package com.placeprep.controller;

import com.placeprep.dto.ApiResponse;
import com.placeprep.dto.QuizSubmitRequest;
import com.placeprep.model.AptitudeQuestion;
import com.placeprep.model.QuizAttempt;
import com.placeprep.service.AptitudeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Aptitude REST Controller.
 * Direct equivalent of Node.js aptitudeRoutes.js:
 * - router.get('/questions', protect, getQuestions) -> @GetMapping("/questions")
 * - router.get('/questions/:id', protect, getQuestion) -> @GetMapping("/questions/{id}")
 * - router.get('/quiz', protect, startQuiz) -> @GetMapping("/quiz")
 * - router.post('/attempt', protect, submitAttempt) -> @PostMapping("/attempt")
 * - router.get('/history', protect, getHistory) -> @GetMapping("/history")
 */
@RestController
@RequestMapping("/api/aptitude")
public class AptitudeController {

    private final AptitudeService aptitudeService;

    public AptitudeController(AptitudeService aptitudeService) {
        this.aptitudeService = aptitudeService;
    }

    /**
     * Equivalent to: router.get('/questions', protect, getQuestions)
     */
    @GetMapping("/questions")
    public ResponseEntity<ApiResponse<List<AptitudeQuestion>>> getQuestions(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty) {
        List<AptitudeQuestion> questions = aptitudeService.getQuestions(category, difficulty);
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    /**
     * Equivalent to: router.get('/questions/:id', protect, getQuestion)
     */
    @GetMapping("/questions/{id}")
    public ResponseEntity<ApiResponse<AptitudeQuestion>> getQuestion(@PathVariable Long id) {
        return aptitudeService.getQuestionById(id)
                .map(q -> ResponseEntity.ok(ApiResponse.success(q)))
                .orElse(ResponseEntity.status(404).body(ApiResponse.error("Question not found")));
    }

    /**
     * Equivalent to: router.get('/quiz', protect, startQuiz)
     */
    @GetMapping("/quiz")
    public ResponseEntity<ApiResponse<List<AptitudeQuestion>>> startQuiz(
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "5") Integer limit) {
        List<AptitudeQuestion> quizQuestions = aptitudeService.generateQuiz(category, limit);
        return ResponseEntity.ok(ApiResponse.success(quizQuestions));
    }

    /**
     * Equivalent to: router.post('/attempt', protect, submitAttempt)
     */
    @PostMapping("/attempt")
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitAttempt(
            @RequestParam(value = "userId", required = false, defaultValue = "1") Long userId,
            @RequestBody QuizSubmitRequest request) {
        Map<String, Object> result = aptitudeService.submitAttempt(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Quiz attempt submitted successfully", result));
    }

    /**
     * Equivalent to: router.get('/history', protect, getHistory)
     */
    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<QuizAttempt>>> getHistory(
            @RequestParam(value = "userId", required = false, defaultValue = "1") Long userId) {
        List<QuizAttempt> history = aptitudeService.getUserHistory(userId);
        return ResponseEntity.ok(ApiResponse.success(history));
    }
}
