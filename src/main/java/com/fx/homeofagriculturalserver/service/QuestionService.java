package com.fx.homeofagriculturalserver.service;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.entity.Question;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface QuestionService {
    List<Question> findAllByPage(Date lastDate) throws MyServerException;

    List<Question> findTypeByPage(Date lastDate,Integer type) throws MyServerException;

    void addQuestion(Long tel, Question question) throws MyServerException;

    void deleteQuestion(Long currentUser, Integer questionId) throws MyServerException;

    void changeQuestion(Long tel, Question question, MultipartFile file) throws MyServerException;
}
