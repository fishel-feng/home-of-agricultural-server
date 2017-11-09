package com.fx.homeofagriculturalserver.service.impl;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.common.utils.QiNiuUtil;
import com.fx.homeofagriculturalserver.dao.ImageMapper;
import com.fx.homeofagriculturalserver.dao.QuestionMapper;
import com.fx.homeofagriculturalserver.entity.Image;
import com.fx.homeofagriculturalserver.entity.Question;
import com.fx.homeofagriculturalserver.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionMapper questionMapper;

    @Autowired
    private ImageMapper imageMapper;

    @Override
    public List<Question> findAllByPage(Date lastDate) throws MyServerException {
        List<Question> questions;
        try {
            questions = questionMapper.findAllByPage(lastDate);
        } catch (Exception e) {
            throw new MyServerException("未知错误");
        }
        return questions;
    }

    @Override
    public List<Question> findTypeByPage(Date lastDate, Integer type) throws MyServerException {
        List<Question> questions;
        try {
            questions = questionMapper.findTypeByPage(lastDate, type);
        } catch (Exception e) {
            throw new MyServerException("未知错误");
        }
        return questions;
    }

    @Transactional
    @Override
    public void addQuestion(Long tel, Question question) throws MyServerException {
        try {
            question.setUserTel(tel);
            question.setDate(new Date());
            questionMapper.insertSelective(question);
        } catch (Exception e) {
            throw new MyServerException(e.getMessage());
        }
    }

    @Transactional
    @Override
    public void deleteQuestion(Long currentUser, Integer questionId) throws MyServerException {
        try {
            Question question = questionMapper.selectByPrimaryKey(questionId);
            if (!Objects.equals(currentUser, question.getUserTel())) {
                throw new Exception("身份校验错误");
            }
            questionMapper.deleteByPrimaryKey(questionId);
            List<Image> images = imageMapper.selectByQuestion(questionId);
            for (Image image : images) {
                QiNiuUtil.deleteImg(image.getContent());
            }
            imageMapper.deleteByQuestion(questionId);
        } catch (Exception e) {
            throw new MyServerException(e.getMessage());
        }
    }

    @Override
    public void changeQuestion(Long tel, Question question, MultipartFile file) throws MyServerException {
        try {
            Question q = questionMapper.selectByPrimaryKey(question.getId());
            if (!Objects.equals(tel, q.getUserTel())) {
                throw new Exception("身份校验错误");
            }
            question.setUserTel(tel);
            question.setDate(new Date());
            questionMapper.updateByPrimaryKeySelective(question);
            if (file != null) {
                List<Image> images = imageMapper.selectByQuestion(question.getId());
                for (Image image : images) {
                    QiNiuUtil.deleteImg(image.getContent());
                }
                imageMapper.deleteByQuestion(question.getId());
                Image image = new Image();
                image.setType((byte) 0);
                image.setTargetId(question.getId());
                try {
                    String imgUrl = QiNiuUtil.uploadImg(file);
                    image.setContent(imgUrl);
                } catch (IOException e) {
                    throw new MyServerException("图片上传异常");
                }
                imageMapper.insertSelective(image);
            }
        } catch (Exception e) {
            throw new MyServerException(e.getMessage());
        }
    }
}
