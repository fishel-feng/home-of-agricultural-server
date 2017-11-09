package com.fx.homeofagriculturalserver.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Comment {
    private Integer id;

    private Long userTel;

    private String content;

    private Integer commentId;

    private Date date;

    private Integer circleId;
}