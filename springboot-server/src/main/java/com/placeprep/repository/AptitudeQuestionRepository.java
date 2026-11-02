package com.placeprep.repository;

import com.placeprep.model.AptitudeQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AptitudeQuestionRepository extends JpaRepository<AptitudeQuestion, Long> {
    List<AptitudeQuestion> findByCategory(String category);
    List<AptitudeQuestion> findByDifficulty(String difficulty);
    List<AptitudeQuestion> findByCategoryAndDifficulty(String category, String difficulty);

    @Query(value = "SELECT * FROM aptitude_questions ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<AptitudeQuestion> findRandomQuestions(@Param("limit") int limit);

    @Query(value = "SELECT * FROM aptitude_questions WHERE category = :category ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<AptitudeQuestion> findRandomByCategory(@Param("category") String category, @Param("limit") int limit);
}
