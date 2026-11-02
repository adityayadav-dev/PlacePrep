package com.placeprep.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false, length = 50)
    private String category; // 'Aptitude', 'Coding', 'Interview', 'General'

    @Column(nullable = false, length = 50)
    private String type; // 'Article', 'Video', 'PDF', 'Website'

    @Column(nullable = false, length = 500)
    private String url;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Resource() {}

    public Resource(String title, String description, String category, String type, String url) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.type = type;
        this.url = url;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
