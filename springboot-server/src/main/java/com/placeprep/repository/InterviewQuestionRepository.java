package com.placeprep.repository;

import com.placeprep.model.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Long> {
    List<InterviewQuestion> findByCategory(String category);
    List<InterviewQuestion> findByDifficulty(String difficulty);
    List<InterviewQuestion> findByCategoryAndDifficulty(String category, String difficulty);
}
