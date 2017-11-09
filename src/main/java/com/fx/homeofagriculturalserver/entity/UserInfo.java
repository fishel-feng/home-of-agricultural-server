package com.fx.homeofagriculturalserver.entity;

import lombok.Data;

@Data
public class UserInfo {

    private Long tel;

    private String password;

    private String verificationCode;

    private String platform;

    private String pushChannelId;
}
