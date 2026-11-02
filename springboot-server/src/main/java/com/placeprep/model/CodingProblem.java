package com.placeprep.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "coding_problems")
public class CodingProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 4000)
    private String description;

    @Column(nullable = false, length = 20)
    private String difficulty; // 'Easy', 'Medium', 'Hard'

    @Column(nullable = false, length = 50)
    private String topic; // 'Arrays', 'Strings', 'Binary Search', 'Linked List', etc.

    @Column(length = 2000)
    private String example;

    @Column(name = "external_url", length = 500)
    private String externalUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public CodingProblem() {}

    public CodingProblem(String title, String description, String difficulty, String topic, String example, String externalUrl) {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.topic = topic;
        this.example = example;
        this.externalUrl = externalUrl;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getExample() { return example; }
    public void setExample(String example) { this.example = example; }

    public String getExternalUrl() { return externalUrl; }
    public void setExternalUrl(String externalUrl) { this.externalUrl = externalUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
