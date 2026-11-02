package com.placeprep.repository;

import com.placeprep.model.InterviewProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewProgressRepository extends JpaRepository<InterviewProgress, Long> {
    List<InterviewProgress> findByUserId(Long userId);
    List<InterviewProgress> findByUserIdAndCompletedTrue(Long userId);
    Optional<InterviewProgress> findByUserIdAndQuestionId(Long userId, Long questionId);
    long countByUserIdAndCompletedTrue(Long userId);
}
