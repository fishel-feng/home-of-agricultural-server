package com.fx.homeofagriculturalserver.service.impl;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.dao.AddQuestionMapper;
import com.fx.homeofagriculturalserver.dao.AnswerMapper;
import com.fx.homeofagriculturalserver.entity.AddQuestion;
import com.fx.homeofagriculturalserver.entity.Answer;
import com.fx.homeofagriculturalserver.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerMapper answerMapper;

    @Autowired
    private AddQuestionMapper addQuestionMapper;

    @Override
    public List<Answer> findAllOfQuestion(Integer questionId) throws MyServerException {
        List<Answer> answers;
        try {
            answers = answerMapper.selectByQuestionId(questionId);
            for (Answer answer : answers) {
                List<AddQuestion> addQuestions = addQuestionMapper.selectByAnswerId(answer.getId());
                answer.setAddQuestions(addQuestions);
            }
        } catch (Exception e) {
            throw new MyServerException("查询失败");
        }
        return answers;
    }

    @Transactional
    @Override
    public void addNewAnswer(Long tel, Integer questionId, Answer answer) throws MyServerException {
        try {
            answer.setUserTel(tel);
            answer.setDate(new Date());
            answer.setQuestionId(questionId);
        } catch (Exception e) {
            throw new MyServerException("添加回答失败");
        }
    }

    @Override
    public void addNewQuestionToAnswer(Integer answerId, AddQuestion addQuestion, Long tel) throws MyServerException {
        try {
            addQuestion.setAnswerId(answerId);
            addQuestion.setDate(new Date());
            addQuestion.setUserTel(tel);
            addQuestion.setAddId(answerId);
            addQuestionMapper.insertSelective(addQuestion);
        } catch (Exception e) {
            throw new MyServerException("添加失败");
        }
    }

}
