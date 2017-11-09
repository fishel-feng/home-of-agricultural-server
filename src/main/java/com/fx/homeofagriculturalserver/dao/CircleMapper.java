package com.fx.homeofagriculturalserver.dao;

import com.fx.homeofagriculturalserver.entity.Circle;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface CircleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Circle record);

    int insertSelective(Circle record);

    Circle selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Circle record);

    int updateByPrimaryKeyWithBLOBs(Circle record);

    int updateByPrimaryKey(Circle record);

    List<Circle> findAllByPage(@Param("lastDate") Date lastDate);
}