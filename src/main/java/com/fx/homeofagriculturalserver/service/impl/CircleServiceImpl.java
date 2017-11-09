package com.fx.homeofagriculturalserver.service.impl;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.dao.CircleMapper;
import com.fx.homeofagriculturalserver.entity.Circle;
import com.fx.homeofagriculturalserver.service.CircleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CircleServiceImpl implements CircleService {

    @Autowired
    private CircleMapper circleMapper;

    @Override
    public List<Circle> findAllByPage(Date lastDate) throws MyServerException {
        List<Circle> circles;
        try {
            circles = circleMapper.findAllByPage(lastDate);
        } catch (Exception e) {
            throw new MyServerException(e.getMessage());
        }
        return circles;
    }

    @Override
    public void addCircle(Long tel, Circle circle) throws MyServerException {
        try {
            circle.setDate(new Date());
            circle.setUserTel(tel);
            circleMapper.insertSelective(circle);
        } catch (Exception e) {
            throw new MyServerException(e.getMessage());
        }
    }
}
