package com.placeprep.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interview_questions")
public class InterviewQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String question;

    @Column(nullable = false, length = 4000)
    private String answer;

    @Column(nullable = false, length = 50)
    private String category; // 'HR', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Java', 'Spring Boot', 'React', 'DSA'

    @Column(nullable = false, length = 20)
    private String difficulty; // 'Easy', 'Medium', 'Hard'

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public InterviewQuestion() {}

    public InterviewQuestion(String question, String answer, String category, String difficulty) {
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.difficulty = difficulty;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
