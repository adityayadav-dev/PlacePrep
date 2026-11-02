package com.placeprep.service;

import com.placeprep.model.InterviewProgress;
import com.placeprep.model.InterviewQuestion;
import com.placeprep.repository.InterviewProgressRepository;
import com.placeprep.repository.InterviewQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InterviewService {

    private final InterviewQuestionRepository questionRepository;
    private final InterviewProgressRepository progressRepository;

    public InterviewService(InterviewQuestionRepository questionRepository, InterviewProgressRepository progressRepository) {
        this.questionRepository = questionRepository;
        this.progressRepository = progressRepository;
    }

    public List<Map<String, Object>> getQuestionsWithUserStatus(Long userId, String category, String difficulty) {
        List<InterviewQuestion> questions;
        if (category != null && difficulty != null) {
            questions = questionRepository.findByCategoryAndDifficulty(category, difficulty);
        } else if (category != null) {
            questions = questionRepository.findByCategory(category);
        } else if (difficulty != null) {
            questions = questionRepository.findByDifficulty(difficulty);
        } else {
            questions = questionRepository.findAll();
        }

        Set<Long> completedIds = new HashSet<>();
        if (userId != null) {
            for (InterviewProgress p : progressRepository.findByUserIdAndCompletedTrue(userId)) {
                completedIds.add(p.getQuestionId());
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (InterviewQuestion q : questions) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", q.getId());
            map.put("_id", q.getId().toString());
            map.put("question", q.getQuestion());
            map.put("answer", q.getAnswer());
            map.put("category", q.getCategory());
            map.put("difficulty", q.getDifficulty());
            map.put("isCompleted", completedIds.contains(q.getId()));
            result.add(map);
        }
        return result;
    }

    public Optional<InterviewQuestion> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public Map<String, Object> toggleInterviewCompleted(Long userId, Long questionId) {
        Long uid = (userId != null) ? userId : 1L;
        Optional<InterviewProgress> existing = progressRepository.findByUserIdAndQuestionId(uid, questionId);

        InterviewProgress progress;
        if (existing.isPresent()) {
            progress = existing.get();
            progress.setCompleted(!progress.getCompleted());
        } else {
            progress = new InterviewProgress(uid, questionId, true);
        }
        progressRepository.save(progress);

        Map<String, Object> response = new HashMap<>();
        response.put("questionId", questionId);
        response.put("isCompleted", progress.getCompleted());
        return response;
    }
}
