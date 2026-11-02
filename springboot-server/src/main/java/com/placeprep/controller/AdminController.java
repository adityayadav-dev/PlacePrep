package com.placeprep.controller;

import com.placeprep.dto.ApiResponse;
import com.placeprep.model.AptitudeQuestion;
import com.placeprep.model.CodingProblem;
import com.placeprep.model.InterviewQuestion;
import com.placeprep.model.Resource;
import com.placeprep.repository.AptitudeQuestionRepository;
import com.placeprep.repository.CodingProblemRepository;
import com.placeprep.repository.InterviewQuestionRepository;
import com.placeprep.repository.ResourceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Admin Content Management REST Controller.
 * Direct equivalent of Node.js adminRoutes.js:
 * - router.post('/aptitude', createAptitude)    -> @PostMapping("/aptitude")
 * - router.put('/aptitude/:id', updateAptitude) -> @PutMapping("/aptitude/{id}")
 * - router.delete('/aptitude/:id', deleteAptitude)-> @DeleteMapping("/aptitude/{id}")
 * ... and equivalent CRUD mappings for coding, interview, and resources.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AptitudeQuestionRepository aptitudeRepo;
    private final CodingProblemRepository codingRepo;
    private final InterviewQuestionRepository interviewRepo;
    private final ResourceRepository resourceRepo;

    public AdminController(
            AptitudeQuestionRepository aptitudeRepo,
            CodingProblemRepository codingRepo,
            InterviewQuestionRepository interviewRepo,
            ResourceRepository resourceRepo) {
        this.aptitudeRepo = aptitudeRepo;
        this.codingRepo = codingRepo;
        this.interviewRepo = interviewRepo;
        this.resourceRepo = resourceRepo;
    }

    // --- APTITUDE CRUD ---
    @PostMapping("/aptitude")
    public ResponseEntity<ApiResponse<AptitudeQuestion>> createAptitude(@RequestBody AptitudeQuestion question) {
        AptitudeQuestion saved = aptitudeRepo.save(question);
        return ResponseEntity.ok(ApiResponse.success("Aptitude question created", saved));
    }

    @PutMapping("/aptitude/{id}")
    public ResponseEntity<ApiResponse<AptitudeQuestion>> updateAptitude(@PathVariable Long id, @RequestBody AptitudeQuestion question) {
        return aptitudeRepo.findById(id).map(existing -> {
            existing.setQuestion(question.getQuestion());
            existing.setOptions(question.getOptions());
            existing.setCorrectAnswer(question.getCorrectAnswer());
            existing.setExplanation(question.getExplanation());
            existing.setCategory(question.getCategory());
            existing.setDifficulty(question.getDifficulty());
            AptitudeQuestion updated = aptitudeRepo.save(existing);
            return ResponseEntity.ok(ApiResponse.success("Aptitude question updated", updated));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Question not found")));
    }

    @DeleteMapping("/aptitude/{id}")
    public ResponseEntity<ApiResponse<String>> deleteAptitude(@PathVariable Long id) {
        aptitudeRepo.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Aptitude question deleted successfully", "Deleted ID: " + id));
    }

    // --- CODING CRUD ---
    @PostMapping("/coding")
    public ResponseEntity<ApiResponse<CodingProblem>> createCoding(@RequestBody CodingProblem problem) {
        CodingProblem saved = codingRepo.save(problem);
        return ResponseEntity.ok(ApiResponse.success("Coding problem created", saved));
    }

    @PutMapping("/coding/{id}")
    public ResponseEntity<ApiResponse<CodingProblem>> updateCoding(@PathVariable Long id, @RequestBody CodingProblem problem) {
        return codingRepo.findById(id).map(existing -> {
            existing.setTitle(problem.getTitle());
            existing.setDescription(problem.getDescription());
            existing.setDifficulty(problem.getDifficulty());
            existing.setTopic(problem.getTopic());
            existing.setExample(problem.getExample());
            existing.setExternalUrl(problem.getExternalUrl());
            CodingProblem updated = codingRepo.save(existing);
            return ResponseEntity.ok(ApiResponse.success("Coding problem updated", updated));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Problem not found")));
    }

    @DeleteMapping("/coding/{id}")
    public ResponseEntity<ApiResponse<String>> deleteCoding(@PathVariable Long id) {
        codingRepo.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Coding problem deleted successfully", "Deleted ID: " + id));
    }

    // --- INTERVIEW CRUD ---
    @PostMapping("/interview")
    public ResponseEntity<ApiResponse<InterviewQuestion>> createInterview(@RequestBody InterviewQuestion question) {
        InterviewQuestion saved = interviewRepo.save(question);
        return ResponseEntity.ok(ApiResponse.success("Interview question created", saved));
    }

    @PutMapping("/interview/{id}")
    public ResponseEntity<ApiResponse<InterviewQuestion>> updateInterview(@PathVariable Long id, @RequestBody InterviewQuestion question) {
        return interviewRepo.findById(id).map(existing -> {
            existing.setQuestion(question.getQuestion());
            existing.setAnswer(question.getAnswer());
            existing.setCategory(question.getCategory());
            existing.setDifficulty(question.getDifficulty());
            InterviewQuestion updated = interviewRepo.save(existing);
            return ResponseEntity.ok(ApiResponse.success("Interview question updated", updated));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Question not found")));
    }

    @DeleteMapping("/interview/{id}")
    public ResponseEntity<ApiResponse<String>> deleteInterview(@PathVariable Long id) {
        interviewRepo.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Interview question deleted successfully", "Deleted ID: " + id));
    }

    // --- RESOURCES CRUD ---
    @PostMapping("/resources")
    public ResponseEntity<ApiResponse<Resource>> createResource(@RequestBody Resource resource) {
        Resource saved = resourceRepo.save(resource);
        return ResponseEntity.ok(ApiResponse.success("Resource created", saved));
    }

    @PutMapping("/resources/{id}")
    public ResponseEntity<ApiResponse<Resource>> updateResource(@PathVariable Long id, @RequestBody Resource resource) {
        return resourceRepo.findById(id).map(existing -> {
            existing.setTitle(resource.getTitle());
            existing.setDescription(resource.getDescription());
            existing.setCategory(resource.getCategory());
            existing.setType(resource.getType());
            existing.setUrl(resource.getUrl());
            Resource updated = resourceRepo.save(existing);
            return ResponseEntity.ok(ApiResponse.success("Resource updated", updated));
        }).orElse(ResponseEntity.status(404).body(ApiResponse.error("Resource not found")));
    }

    @DeleteMapping("/resources/{id}")
    public ResponseEntity<ApiResponse<String>> deleteResource(@PathVariable Long id) {
        resourceRepo.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Resource deleted successfully", "Deleted ID: " + id));
    }
}
