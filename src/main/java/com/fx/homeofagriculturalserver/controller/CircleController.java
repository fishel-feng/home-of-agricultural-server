package com.fx.homeofagriculturalserver.controller;

import com.fx.homeofagriculturalserver.common.constants.Constants;
import com.fx.homeofagriculturalserver.common.controller.BaseController;
import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.common.response.ApiResult;
import com.fx.homeofagriculturalserver.entity.Circle;
import com.fx.homeofagriculturalserver.entity.Comment;
import com.fx.homeofagriculturalserver.entity.UserElement;
import com.fx.homeofagriculturalserver.service.CircleService;
import com.fx.homeofagriculturalserver.service.CommentService;
import com.fx.homeofagriculturalserver.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Slf4j
@Controller("circle")
public class CircleController extends BaseController {

    @Autowired
    @Qualifier("circleServiceImpl")
    private CircleService circleService;

    @Autowired
    @Qualifier("imageServiceImpl")
    private ImageService imageService;

    @Autowired
    @Qualifier("commentServiceImpl")
    private CommentService commentService;

    @GetMapping("showCircle/{date}")
    public ApiResult<List<Circle>> showCircle(@PathVariable("date") Date lastDate) {
        ApiResult<List<Circle>> resp = new ApiResult<>();
        try {
            List<Circle> circles = circleService.findAllByPage(lastDate);
            resp.setData(circles);
            resp.setMessage("查询成功");
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PostMapping("addCircle")
    public ApiResult addCircle(@RequestBody Circle circle, @RequestParam(required = false) MultipartFile file) {
        ApiResult resp = new ApiResult();
        try {
            if (StringUtils.isBlank(circle.getContent())) {
                throw new MyServerException("标题或内容不许为空");
            }
            UserElement userElement = getCurrentUser();
            circleService.addCircle(userElement.getTel(), circle);
            if (file != null) {
                imageService.uploadImage((byte) 2, circle.getId(), file);
            }
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to add", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }


    @PostMapping("circle/{flag}")
    public ApiResult goodAndBad(@PathVariable("flag")Boolean flag){
        // todo
        return null;
    }

    @GetMapping("{id}/comment")
    public ApiResult<List<Comment>> showComment(@PathVariable("id") Integer circleId) {
        ApiResult<List<Comment>> resp = new ApiResult<>();
        try {
            List<Comment> comments = commentService.findAllOfCircle(circleId);
            resp.setData(comments);
            resp.setMessage("查询成功");
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PostMapping("{id}/comment/{commentId}")
    public ApiResult addComment(@PathVariable("id") Integer circleId, @RequestBody Comment comment, @PathVariable("commentId") Integer commentId) {
        ApiResult resp = new ApiResult();
        try {
            if (StringUtils.isBlank(comment.getContent())) {
                throw new MyServerException("内容不许为空");
            }
            UserElement userElement = getCurrentUser();
            commentService.addNewComment(userElement.getTel(), circleId, comment, commentId);
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to add", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @DeleteMapping("comment/{commentId}")
    public ApiResult deleteComment(@PathVariable("commentId") Integer commentId) {
        ApiResult resp = new ApiResult();
        try {
            UserElement userElement = getCurrentUser();
            commentService.deleteComment(userElement.getTel(), commentId);
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to delete", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    // todo 返回实体中保留name字段，图像上传删除逻辑重构，认证情况和评论回答状态


}
