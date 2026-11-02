package com.placeprep.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "quiz_attempt_questions", joinColumns = @JoinColumn(name = "attempt_id"))
    @Column(name = "question_id")
    private List<Long> questionIds = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "quiz_attempt_answers", joinColumns = @JoinColumn(name = "attempt_id"))
    @Column(name = "selected_answer")
    private List<Integer> answers = new ArrayList<>();

    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false)
    private Integer total;

    @Column(length = 50)
    private String category = "Mixed";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public QuizAttempt() {}

    public QuizAttempt(Long userId, List<Long> questionIds, List<Integer> answers, Integer score, Integer total, String category) {
        this.userId = userId;
        this.questionIds = questionIds;
        this.answers = answers;
        this.score = score;
        this.total = total;
        this.category = category;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public List<Long> getQuestionIds() { return questionIds; }
    public void setQuestionIds(List<Long> questionIds) { this.questionIds = questionIds; }

    public List<Integer> getAnswers() { return answers; }
    public void setAnswers(List<Integer> answers) { this.answers = answers; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
