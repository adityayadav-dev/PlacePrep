package com.placeprep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Entry Point for PlacePrep Spring Boot Backend Assessment Engine.
 * Provides RESTful microservices for:
 * - Student Authentication & Profiles
 * - Quantitative, Logical & Verbal Aptitude Quizzes
 * - Curated DSA Coding Practice & Progress Tracking
 * - Technical (Java/Spring Boot/CS Fundamentals) & HR Interview Questions
 * - Placement Readiness Analytics & KPI Aggregations
 */
@SpringBootApplication
public class PlacePrepApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlacePrepApplication.class, args);
        System.out.println("==========================================================");
        System.out.println("🚀 PlacePrep Spring Boot Assessment Server is running!");
        System.out.println("🌐 Port: http://localhost:8080");
        System.out.println("🗄️ H2 Database Console: http://localhost:8080/h2-console");
        System.out.println("==========================================================");
    }
}
