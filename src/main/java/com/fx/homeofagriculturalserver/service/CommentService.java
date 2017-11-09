package com.fx.homeofagriculturalserver.service;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.entity.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> findAllOfCircle(Integer circleId) throws MyServerException;

    void addNewComment(Long tel, Integer circleId, Comment comment,Integer commentId) throws MyServerException;

    void deleteComment(Long tel, Integer commentId) throws MyServerException;
}
