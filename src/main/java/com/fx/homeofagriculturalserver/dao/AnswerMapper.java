package com.fx.homeofagriculturalserver.dao;

import com.fx.homeofagriculturalserver.entity.Answer;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AnswerMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Answer record);

    int insertSelective(Answer record);

    Answer selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Answer record);

    int updateByPrimaryKeyWithBLOBs(Answer record);

    int updateByPrimaryKey(Answer record);

    List<Answer> selectByQuestionId(@Param("questionId") Integer questionId);
}