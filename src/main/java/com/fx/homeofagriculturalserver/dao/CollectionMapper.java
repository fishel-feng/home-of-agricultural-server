package com.fx.homeofagriculturalserver.dao;

import com.fx.homeofagriculturalserver.entity.CollectionKey;

public interface CollectionMapper {
    int deleteByPrimaryKey(CollectionKey key);

    int insert(CollectionKey record);

    int insertSelective(CollectionKey record);
}