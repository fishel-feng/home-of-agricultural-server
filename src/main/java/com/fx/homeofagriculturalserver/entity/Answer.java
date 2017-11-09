package com.fx.homeofagriculturalserver.entity;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Answer {
    private Integer id;

    private Integer questionId;

    private Date date;

    private Long userTel;

    private Byte state;

    private String content;

    private List<AddQuestion> addQuestions;

}