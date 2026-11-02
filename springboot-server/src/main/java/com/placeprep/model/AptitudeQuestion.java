package com.placeprep.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "aptitude_questions")
public class AptitudeQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String question;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "aptitude_question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_text")
    private List<String> options = new ArrayList<>();

    @Column(nullable = false)
    private Integer correctAnswer; // Index 0-3

    @Column(length = 2000)
    private String explanation;

    @Column(nullable = false, length = 50)
    private String category; // 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'

    @Column(nullable = false, length = 20)
    private String difficulty; // 'Easy', 'Medium', 'Hard'

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public AptitudeQuestion() {}

    public AptitudeQuestion(String question, List<String> options, Integer correctAnswer, String explanation, String category, String difficulty) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.category = category;
        this.difficulty = difficulty;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public Integer getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(Integer correctAnswer) { this.correctAnswer = correctAnswer; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
