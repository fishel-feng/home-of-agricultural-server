package com.fx.homeofagriculturalserver.dao;

import com.fx.homeofagriculturalserver.entity.Question;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface QuestionMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Question record);

    int insertSelective(Question record);

    Question selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Question record);

    int updateByPrimaryKeyWithBLOBs(Question record);

    int updateByPrimaryKey(Question record);

    List<Question> findAllByPage(@Param("lastDate") Date lastDate);

    List<Question> findTypeByPage(@Param("lastDate") Date lastDate, @Param("type") Integer type);
}