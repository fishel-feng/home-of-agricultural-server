package com.fx.homeofagriculturalserver.dao;

import com.fx.homeofagriculturalserver.entity.Image;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ImageMapper {
    int deleteByPrimaryKey(String content);

    int insert(Image record);

    int insertSelective(Image record);

    Image selectByPrimaryKey(String content);

    int updateByPrimaryKeySelective(Image record);

    int updateByPrimaryKey(Image record);

    Image deleteByQuestion(@Param("questionId") Integer questionId);

    List<Image> selectByQuestion(@Param("questionId") Integer questionId);
}