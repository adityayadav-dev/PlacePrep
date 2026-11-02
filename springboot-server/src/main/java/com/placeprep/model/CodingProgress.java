package com.placeprep.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "coding_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "problem_id"})
})
public class CodingProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "problem_id", nullable = false)
    private Long problemId;

    @Column(nullable = false)
    private Boolean solved = false;

    @Column(name = "completed_at")
    private LocalDateTime completedAt = LocalDateTime.now();

    public CodingProgress() {}

    public CodingProgress(Long userId, Long problemId, Boolean solved) {
        this.userId = userId;
        this.problemId = problemId;
        this.solved = solved;
        this.completedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getProblemId() { return problemId; }
    public void setProblemId(Long problemId) { this.problemId = problemId; }

    public Boolean getSolved() { return solved; }
    public void setSolved(Boolean solved) { this.solved = solved; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
