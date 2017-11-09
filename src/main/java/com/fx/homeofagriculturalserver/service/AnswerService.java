package com.fx.homeofagriculturalserver.service;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.entity.AddQuestion;
import com.fx.homeofagriculturalserver.entity.Answer;

import java.util.List;

public interface AnswerService {
    List<Answer> findAllOfQuestion(Integer questionId) throws MyServerException;

    void addNewAnswer(Long tel, Integer questionId, Answer answer) throws MyServerException;

    void addNewQuestionToAnswer(Integer answerId, AddQuestion addQuestion,Long tel) throws MyServerException;
}
