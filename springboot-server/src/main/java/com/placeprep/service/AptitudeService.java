package com.placeprep.service;

import com.placeprep.dto.QuizSubmitRequest;
import com.placeprep.model.AptitudeQuestion;
import com.placeprep.model.QuizAttempt;
import com.placeprep.repository.AptitudeQuestionRepository;
import com.placeprep.repository.QuizAttemptRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AptitudeService {

    private final AptitudeQuestionRepository aptitudeRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public AptitudeService(AptitudeQuestionRepository aptitudeRepository, QuizAttemptRepository quizAttemptRepository) {
        this.aptitudeRepository = aptitudeRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    public List<AptitudeQuestion> getQuestions(String category, String difficulty) {
        if (category != null && difficulty != null) {
            return aptitudeRepository.findByCategoryAndDifficulty(category, difficulty);
        } else if (category != null) {
            return aptitudeRepository.findByCategory(category);
        } else if (difficulty != null) {
            return aptitudeRepository.findByDifficulty(difficulty);
        }
        return aptitudeRepository.findAll();
    }

    public Optional<AptitudeQuestion> getQuestionById(Long id) {
        return aptitudeRepository.findById(id);
    }

    public List<AptitudeQuestion> generateQuiz(String category, Integer limit) {
        int count = (limit != null && limit > 0) ? limit : 5;
        List<AptitudeQuestion> pool;
        if (category != null && !category.equalsIgnoreCase("all")) {
            pool = aptitudeRepository.findByCategory(category);
        } else {
            pool = aptitudeRepository.findAll();
        }

        Collections.shuffle(pool);
        return pool.stream().limit(count).toList();
    }

    public Map<String, Object> submitAttempt(Long userId, QuizSubmitRequest request) {
        int score = 0;
        List<Long> qIds = request.getQuestionIds();
        List<Integer> userAnswers = request.getAnswers();

        for (int i = 0; i < qIds.size(); i++) {
            Long qId = qIds.get(i);
            Optional<AptitudeQuestion> qOpt = aptitudeRepository.findById(qId);
            if (qOpt.isPresent() && i < userAnswers.size()) {
                if (Objects.equals(qOpt.get().getCorrectAnswer(), userAnswers.get(i))) {
                    score++;
                }
            }
        }

        QuizAttempt attempt = new QuizAttempt(
                userId != null ? userId : 1L,
                qIds,
                userAnswers,
                score,
                qIds.size(),
                request.getCategory() != null ? request.getCategory() : "Mixed"
        );
        QuizAttempt saved = quizAttemptRepository.save(attempt);

        Map<String, Object> response = new HashMap<>();
        response.put("attemptId", saved.getId());
        response.put("score", score);
        response.put("total", qIds.size());
        response.put("percentage", qIds.isEmpty() ? 0 : (score * 100.0 / qIds.size()));
        response.put("attempt", saved);
        return response;
    }

    public List<QuizAttempt> getUserHistory(Long userId) {
        return quizAttemptRepository.findByUserIdOrderByCreatedAtDesc(userId != null ? userId : 1L);
    }
}
