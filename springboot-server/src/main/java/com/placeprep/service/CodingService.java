package com.placeprep.service;

import com.placeprep.model.CodingProblem;
import com.placeprep.model.CodingProgress;
import com.placeprep.repository.CodingProblemRepository;
import com.placeprep.repository.CodingProgressRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CodingService {

    private final CodingProblemRepository problemRepository;
    private final CodingProgressRepository progressRepository;

    public CodingService(CodingProblemRepository problemRepository, CodingProgressRepository progressRepository) {
        this.problemRepository = problemRepository;
        this.progressRepository = progressRepository;
    }

    public List<Map<String, Object>> getProblemsWithUserStatus(Long userId, String topic, String difficulty) {
        List<CodingProblem> problems;
        if (topic != null && difficulty != null) {
            problems = problemRepository.findByTopicAndDifficulty(topic, difficulty);
        } else if (topic != null) {
            problems = problemRepository.findByTopic(topic);
        } else if (difficulty != null) {
            problems = problemRepository.findByDifficulty(difficulty);
        } else {
            problems = problemRepository.findAll();
        }

        Set<Long> solvedProblemIds = new HashSet<>();
        if (userId != null) {
            for (CodingProgress p : progressRepository.findByUserIdAndSolvedTrue(userId)) {
                solvedProblemIds.add(p.getProblemId());
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (CodingProblem p : problems) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("_id", p.getId().toString());
            map.put("title", p.getTitle());
            map.put("description", p.getDescription());
            map.put("difficulty", p.getDifficulty());
            map.put("topic", p.getTopic());
            map.put("example", p.getExample());
            map.put("externalUrl", p.getExternalUrl());
            map.put("isSolved", solvedProblemIds.contains(p.getId()));
            result.add(map);
        }
        return result;
    }

    public Optional<CodingProblem> getProblemById(Long id) {
        return problemRepository.findById(id);
    }

    public Map<String, Object> toggleProblemSolved(Long userId, Long problemId) {
        Long uid = (userId != null) ? userId : 1L;
        Optional<CodingProgress> existing = progressRepository.findByUserIdAndProblemId(uid, problemId);

        CodingProgress progress;
        if (existing.isPresent()) {
            progress = existing.get();
            progress.setSolved(!progress.getSolved());
        } else {
            progress = new CodingProgress(uid, problemId, true);
        }
        progressRepository.save(progress);

        Map<String, Object> response = new HashMap<>();
        response.put("problemId", problemId);
        response.put("isSolved", progress.getSolved());
        return response;
    }
}
