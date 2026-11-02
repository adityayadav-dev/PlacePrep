package com.placeprep.seed;

import com.placeprep.model.*;
import com.placeprep.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

/**
 * Spring Boot Data Initializer (CommandLineRunner).
 * Runs automatically upon Spring Boot startup to seed realistic dummy data:
 * - Admin and Student default credentials
 * - Java & Spring Boot Placement Interview Questions
 * - Quantitative Aptitude & Reasoning questions
 * - DSA Coding Problems with problem descriptions & constraints
 * - Learning resources and roadmaps
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepo;
    private final AptitudeQuestionRepository aptitudeRepo;
    private final CodingProblemRepository codingRepo;
    private final InterviewQuestionRepository interviewRepo;
    private final ResourceRepository resourceRepo;
    private final CodingProgressRepository codingProgressRepo;
    private final InterviewProgressRepository interviewProgressRepo;
    private final QuizAttemptRepository quizAttemptRepo;

    public DataInitializer(
            UserRepository userRepo,
            AptitudeQuestionRepository aptitudeRepo,
            CodingProblemRepository codingRepo,
            InterviewQuestionRepository interviewRepo,
            ResourceRepository resourceRepo,
            CodingProgressRepository codingProgressRepo,
            InterviewProgressRepository interviewProgressRepo,
            QuizAttemptRepository quizAttemptRepo) {
        this.userRepo = userRepo;
        this.aptitudeRepo = aptitudeRepo;
        this.codingRepo = codingRepo;
        this.interviewRepo = interviewRepo;
        this.resourceRepo = resourceRepo;
        this.codingProgressRepo = codingProgressRepo;
        this.interviewProgressRepo = interviewProgressRepo;
        this.quizAttemptRepo = quizAttemptRepo;
    }

    @Override
    public void run(String... args) {
        if (userRepo.count() > 0) {
            return; // Data already seeded
        }

        System.out.println("🌱 Seeding PlacePrep Spring Boot dummy data...");

        // 1. Seed Users
        User admin = userRepo.save(new User("Admin User", "admin@placeprep.com", "admin123", "admin"));
        User student = userRepo.save(new User("Aditya Student", "student@placeprep.com", "student123", "student"));

        // 2. Seed Java & Spring Boot Focused Interview Questions
        seedInterviewQuestions();

        // 3. Seed Quantitative Aptitude & Reasoning
        seedAptitudeQuestions();

        // 4. Seed DSA Coding Problems
        seedCodingProblems();

        // 5. Seed Placement Resources
        seedResources();

        // 6. Seed Sample Progress for Analytics Dashboard
        seedProgress(student);

        System.out.println("✅ PlacePrep Spring Boot database successfully seeded with Java & Placement dummy data!");
    }

    private void seedInterviewQuestions() {
        List<InterviewQuestion> questions = Arrays.asList(
                new InterviewQuestion(
                        "Explain Inversion of Control (IoC) and Dependency Injection (DI) in Spring Boot.",
                        "Inversion of Control (IoC) is a design principle where the control of object creation and lifecycle management is transferred from the application code to the Spring IoC Container. Dependency Injection (DI) is the pattern used to implement IoC, where dependencies are provided (injected) to a class rather than the class creating them directly. Spring supports Constructor, Setter, and Field injection, with Constructor Injection being the industry best practice.",
                        "OOP",
                        "Medium"
                ),
                new InterviewQuestion(
                        "What is the difference between @RestController and @Controller in Spring?",
                        "@Controller is used for traditional Spring MVC web applications returning HTML views via template engines (Thymeleaf, JSP). @RestController is a convenience annotation combining @Controller and @ResponseBody, specifically designed for RESTful Web Services returning JSON/XML payloads directly to the HTTP response body.",
                        "OOP",
                        "Easy"
                ),
                new InterviewQuestion(
                        "How does Spring Boot Auto-Configuration work under the hood?",
                        "Spring Boot Auto-Configuration inspects the classpath dependencies, existing beans, and configuration properties. It leverages the @EnableAutoConfiguration annotation (part of @SpringBootApplication) and reads 'META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports'. It applies conditional annotations such as @ConditionalOnClass, @ConditionalOnMissingBean, and @ConditionalOnProperty to configure reasonable defaults automatically.",
                        "OOP",
                        "Hard"
                ),
                new InterviewQuestion(
                        "Explain the difference between HashMap, ConcurrentHashMap, and HashTable in Java.",
                        "HashMap is non-synchronized, fast, and allows one null key and multiple null values; it is not thread-safe. HashTable is legacy, synchronized at the method level (locking the whole table), and prohibits nulls. ConcurrentHashMap provides thread-safety with high concurrency by using bucket-level locking (synchronized node blocks and CAS operations) without locking the entire collection.",
                        "OOP",
                        "Medium"
                ),
                new InterviewQuestion(
                        "Explain the Java Memory Model: Heap vs Stack vs Metaspace.",
                        "Stack Memory is allocated per thread for executing method frames, holding local primitive variables and object references. Heap Memory is shared across all threads and stores all actual objects created with 'new'. The Garbage Collector (e.g., G1, ZGC) manages the Heap. Metaspace (introduced in Java 8 replacing PermGen) resides in native OS memory and holds class metadata, method bytecode, and static variables.",
                        "Operating Systems",
                        "Medium"
                ),
                new InterviewQuestion(
                        "What are ACID properties in DBMS and how does Spring manage Transactions (@Transactional)?",
                        "ACID stands for Atomicity, Consistency, Isolation, and Durability. In Spring Boot, @Transactional uses Spring AOP to create a proxy around method execution. It begins a transaction before method entry, commits on successful completion, and rolls back if an unhandled RuntimeException or Error occurs. Isolation levels and propagation behaviors (e.g., REQUIRED, REQUIRES_NEW) can be customized.",
                        "DBMS",
                        "Hard"
                ),
                new InterviewQuestion(
                        "What is the difference between TCP and UDP? When would you use each?",
                        "TCP (Transmission Control Protocol) is connection-oriented, reliable, guarantees packet ordering, and includes flow/congestion control via three-way handshakes (used in HTTP/REST, SSH, DB connections). UDP (User Datagram Protocol) is connectionless, lightweight, and does not guarantee delivery (used in real-time streaming, online gaming, DNS queries, VoIP).",
                        "Computer Networks",
                        "Easy"
                ),
                new InterviewQuestion(
                        "Tell me about a challenging technical bug you resolved during project development.",
                        "Use the STAR method (Situation, Task, Action, Result). Describe diagnosing an issue (e.g., asynchronous state synchronization or CORS preflight failures), using profiling and debugging tools, writing a test case to isolate the bug, and implementing the solution.",
                        "HR",
                        "Easy"
                )
        );
        interviewRepo.saveAll(questions);
    }

    private void seedAptitudeQuestions() {
        List<AptitudeQuestion> questions = Arrays.asList(
                new AptitudeQuestion(
                        "A train 150m long passes a telegraph post in 6 seconds. What is the speed of the train in km/hr?",
                        Arrays.asList("90 km/hr", "75 km/hr", "60 km/hr", "80 km/hr"),
                        0,
                        "Speed = Distance / Time = 150 / 6 = 25 m/s. Convert to km/hr: 25 * (18 / 5) = 90 km/hr.",
                        "Quantitative Aptitude",
                        "Easy"
                ),
                new AptitudeQuestion(
                        "If the ratio of two numbers is 3:5 and their sum is 64, find the smaller number.",
                        Arrays.asList("20", "24", "30", "40"),
                        1,
                        "Let numbers be 3x and 5x. 3x + 5x = 64 => 8x = 64 => x = 8. Smaller number = 3 * 8 = 24.",
                        "Quantitative Aptitude",
                        "Easy"
                ),
                new AptitudeQuestion(
                        "A can complete a project in 12 days. B can complete the same in 18 days. In how many days will they finish together?",
                        Arrays.asList("6.5 days", "7.2 days", "8 days", "9 days"),
                        1,
                        "Combined rate = 1/12 + 1/18 = (3+2)/36 = 5/36. Time = 36/5 = 7.2 days.",
                        "Quantitative Aptitude",
                        "Medium"
                ),
                new AptitudeQuestion(
                        "Find the next number in the series: 3, 7, 15, 31, 63, ...",
                        Arrays.asList("125", "127", "129", "131"),
                        1,
                        "Pattern is * 2 + 1: (3*2+1=7), (7*2+1=15), (15*2+1=31), (31*2+1=63), (63*2+1=127).",
                        "Logical Reasoning",
                        "Easy"
                ),
                new AptitudeQuestion(
                        "Choose the synonym for METICULOUS:",
                        Arrays.asList("Careless", "Thorough", "Hasty", "Casual"),
                        1,
                        "Meticulous means showing great attention to detail; very careful and precise. Synonym: Thorough.",
                        "Verbal Ability",
                        "Easy"
                )
        );
        aptitudeRepo.saveAll(questions);
    }

    private void seedCodingProblems() {
        List<CodingProblem> problems = Arrays.asList(
                new CodingProblem(
                        "Two Sum",
                        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution.",
                        "Easy",
                        "Arrays",
                        "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
                        "https://leetcode.com/problems/two-sum/"
                ),
                new CodingProblem(
                        "Reverse Linked List",
                        "Given the head of a singly linked list, reverse the list, and return the reversed list using iterative or recursive approach.",
                        "Easy",
                        "Linked List",
                        "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]",
                        "https://leetcode.com/problems/reverse-linked-list/"
                ),
                new CodingProblem(
                        "Valid Parentheses",
                        "Given a string s containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid using a Stack.",
                        "Easy",
                        "Stack",
                        "Input: s = \"()[]{}\"\nOutput: true",
                        "https://leetcode.com/problems/valid-parentheses/"
                ),
                new CodingProblem(
                        "Binary Search",
                        "Given an array of integers nums sorted in ascending order, write a function to search target in nums in O(log n) time.",
                        "Easy",
                        "Binary Search",
                        "Input: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4",
                        "https://leetcode.com/problems/binary-search/"
                ),
                new CodingProblem(
                        "LRU Cache Implementation",
                        "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache using a Hash Map and Doubly Linked List in O(1) time.",
                        "Hard",
                        "Dynamic Programming",
                        "Input: LRUCache(2), put(1,1), put(2,2), get(1)...",
                        "https://leetcode.com/problems/lru-cache/"
                )
        );
        codingRepo.saveAll(problems);
    }

    private void seedResources() {
        List<Resource> resources = Arrays.asList(
                new Resource(
                        "Spring Boot 3 Official Reference Guide",
                        "Comprehensive documentation on Spring Boot core features, web MVC, JPA, and Actuator.",
                        "Interview",
                        "Website",
                        "https://docs.spring.io/spring-boot/docs/current/reference/html/"
                ),
                new Resource(
                        "Campus Placement Aptitude Master Roadmap",
                        "Step-by-step topic breakdown for Quantitative Aptitude, Logical Reasoning, and Verbal Ability tests.",
                        "Aptitude",
                        "Article",
                        "https://www.geeksforgeeks.org/placements-gq/"
                ),
                new Resource(
                        "Striver SDE Sheet - Top Coding Interview Problems",
                        "Curated 190+ DSA problems frequently asked in top tech campus recruitments.",
                        "Coding",
                        "Website",
                        "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
                )
        );
        resourceRepo.saveAll(resources);
    }

    private void seedProgress(User student) {
        // Mark first 3 coding problems as solved for demo student
        List<CodingProblem> problems = codingRepo.findAll();
        for (int i = 0; i < Math.min(3, problems.size()); i++) {
            codingProgressRepo.save(new CodingProgress(student.getId(), problems.get(i).getId(), true));
        }

        // Mark first 4 interview questions as completed
        List<InterviewQuestion> questions = interviewRepo.findAll();
        for (int i = 0; i < Math.min(4, questions.size()); i++) {
            interviewProgressRepo.save(new InterviewProgress(student.getId(), questions.get(i).getId(), true));
        }

        // Seed sample quiz attempts
        quizAttemptRepo.save(new QuizAttempt(
                student.getId(),
                Arrays.asList(1L, 2L, 3L, 4L, 5L),
                Arrays.asList(0, 1, 1, 1, 1),
                5,
                5,
                "Quantitative Aptitude"
        ));
    }
}
