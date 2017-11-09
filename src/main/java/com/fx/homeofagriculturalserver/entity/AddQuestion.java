package com.fx.homeofagriculturalserver.entity;

import lombok.Data;

import java.util.Date;

@Data
public class AddQuestion {
    private Integer id;

    private Integer answerId;

    private Long userTel;

    private String content;

    private Integer addId;

    private Date date;
}