package com.fx.homeofagriculturalserver.dao;

import com.fx.homeofagriculturalserver.entity.AddQuestion;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface AddQuestionMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AddQuestion record);

    int insertSelective(AddQuestion record);

    AddQuestion selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AddQuestion record);

    int updateByPrimaryKey(AddQuestion record);

    List<AddQuestion> selectByAnswerId(@Param("answerId") Integer answerId);
}