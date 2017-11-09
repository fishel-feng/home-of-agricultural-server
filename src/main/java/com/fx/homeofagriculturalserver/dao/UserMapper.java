package com.fx.homeofagriculturalserver.dao;

import com.fx.homeofagriculturalserver.entity.User;

public interface UserMapper {
    int deleteByPrimaryKey(Long tel);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Long tel);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}