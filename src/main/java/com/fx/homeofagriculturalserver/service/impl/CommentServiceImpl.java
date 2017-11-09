package com.fx.homeofagriculturalserver.service.impl;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.dao.CommentMapper;
import com.fx.homeofagriculturalserver.entity.Comment;
import com.fx.homeofagriculturalserver.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Override
    public List<Comment> findAllOfCircle(Integer circleId) throws MyServerException {
        List<Comment> comments;
        try {
            comments = commentMapper.selectByCircleId(circleId);
        } catch (Exception e) {
            throw new MyServerException("查询失败");
        }
        return comments;
    }

    @Transactional
    @Override
    public void addNewComment(Long tel, Integer circleId, Comment comment, Integer commentId) throws MyServerException {
        try {
            comment.setUserTel(tel);
            comment.setDate(new Date());
            comment.setCircleId(circleId);
            if (commentId != null) {
                comment.setCommentId(commentId);
            }
        } catch (Exception e) {
            throw new MyServerException("添加评论失败");
        }
    }

    @Override
    public void deleteComment(Long tel, Integer commentId) throws MyServerException {
        try {
            Comment comment = commentMapper.selectByPrimaryKey(commentId);
            if (!Objects.equals(tel, comment.getUserTel())) {
                throw new Exception("身份校验错误");
            }
            commentMapper.deleteByPrimaryKey(commentId);
        } catch (Exception e) {
            throw new MyServerException(e.getMessage());
        }
    }
}
