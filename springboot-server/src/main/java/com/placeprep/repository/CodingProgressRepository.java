package com.placeprep.repository;

import com.placeprep.model.CodingProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodingProgressRepository extends JpaRepository<CodingProgress, Long> {
    List<CodingProgress> findByUserId(Long userId);
    List<CodingProgress> findByUserIdAndSolvedTrue(Long userId);
    Optional<CodingProgress> findByUserIdAndProblemId(Long userId, Long problemId);
    long countByUserIdAndSolvedTrue(Long userId);
}
