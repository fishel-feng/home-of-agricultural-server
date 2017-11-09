package com.fx.homeofagriculturalserver.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Question {
    private Integer id;

    private Long userTel;

    private String title;

    private Date date;

    private Integer typeId;

    private Byte state;

    private String content;
}