package com.placeprep.dto;

import java.util.List;

public class QuizSubmitRequest {
    private List<Long> questionIds;
    private List<Integer> answers;
    private String category;

    public QuizSubmitRequest() {}

    public List<Long> getQuestionIds() { return questionIds; }
    public void setQuestionIds(List<Long> questionIds) { this.questionIds = questionIds; }

    public List<Integer> getAnswers() { return answers; }
    public void setAnswers(List<Integer> answers) { this.answers = answers; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
