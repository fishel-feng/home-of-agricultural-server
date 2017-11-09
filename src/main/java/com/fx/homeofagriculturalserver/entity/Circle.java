package com.fx.homeofagriculturalserver.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Circle {
    private Integer id;

    private Long userTel;

    private Date date;

    private Integer typeId;

    private Integer good;

    private Integer bad;

    private Integer star;

    private String content;

}