package com.fx.homeofagriculturalserver.service;

public interface SmsSender {
    void sendSms(String phone, String tplId, String params);
}
