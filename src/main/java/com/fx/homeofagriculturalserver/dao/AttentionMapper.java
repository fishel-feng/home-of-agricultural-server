package com.fx.homeofagriculturalserver.dao;

import com.fx.homeofagriculturalserver.entity.AttentionKey;

public interface AttentionMapper {
    int deleteByPrimaryKey(AttentionKey key);

    int insert(AttentionKey record);

    int insertSelective(AttentionKey record);
}