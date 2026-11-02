-- PlacePrep Spring Boot Assessment Engine DDL & Seed Script
-- Compatible with H2, MySQL 8, and PostgreSQL

-- 1. Users
INSERT INTO users (name, email, password, role, target_role, graduation_year, created_at, updated_at)
VALUES ('Admin User', 'admin@placeprep.com', 'admin123', 'admin', 'System Administrator', 2026, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO users (name, email, password, role, target_role, graduation_year, created_at, updated_at)
VALUES ('Aditya Student', 'student@placeprep.com', 'student123', 'student', 'Software Development Engineer', 2026, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 2. Interview Questions (Java, Spring Boot, OS, DBMS)
INSERT INTO interview_questions (question, answer, category, difficulty, created_at)
VALUES (
    'Explain Inversion of Control (IoC) and Dependency Injection (DI) in Spring Boot.',
    'IoC shifts object lifecycle control to the Spring Container. DI injects required collaborators into components via Constructor or Setter injection.',
    'OOP',
    'Medium',
    CURRENT_TIMESTAMP
);

INSERT INTO interview_questions (question, answer, category, difficulty, created_at)
VALUES (
    'What is the difference between @RestController and @Controller in Spring Boot?',
    '@RestController combines @Controller and @ResponseBody to return JSON data directly for REST APIs, while @Controller returns template views.',
    'OOP',
    'Easy',
    CURRENT_TIMESTAMP
);

INSERT INTO interview_questions (question, answer, category, difficulty, created_at)
VALUES (
    'What are the advantages of Spring Data JPA over standard JDBC?',
    'Spring Data JPA provides automatic CRUD repository implementations, entity state management, JPQL queries, and built-in transaction management.',
    'DBMS',
    'Medium',
    CURRENT_TIMESTAMP
);

-- 3. Coding Problems
INSERT INTO coding_problems (title, description, difficulty, topic, example, external_url, created_at)
VALUES (
    'Two Sum',
    'Find two numbers in array that sum up to target and return indices in O(n) using HashMap.',
    'Easy',
    'Arrays',
    'nums = [2,7,11,15], target = 9 -> [0,1]',
    'https://leetcode.com/problems/two-sum/',
    CURRENT_TIMESTAMP
);

INSERT INTO coding_problems (title, description, difficulty, topic, example, external_url, created_at)
VALUES (
    'Reverse Linked List',
    'Given singly linked list head, reverse links iteratively using three pointers (prev, curr, next).',
    'Easy',
    'Linked List',
    '[1,2,3,4,5] -> [5,4,3,2,1]',
    'https://leetcode.com/problems/reverse-linked-list/',
    CURRENT_TIMESTAMP
);
