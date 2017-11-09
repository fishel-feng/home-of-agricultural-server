package com.fx.homeofagriculturalserver.service;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.entity.Circle;

import java.util.Date;
import java.util.List;

public interface CircleService {
    List<Circle> findAllByPage(Date lastDate) throws MyServerException;

    void addCircle(Long tel, Circle circle) throws MyServerException;
}
