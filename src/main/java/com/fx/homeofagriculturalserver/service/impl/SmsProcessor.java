package com.fx.homeofagriculturalserver.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fx.homeofagriculturalserver.service.SmsSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.jms.Destination;

@Service
public class SmsProcessor {

    @Autowired
    private JmsMessagingTemplate jmsTemplate;

    @Autowired
    @Qualifier("verCodeService")
    private SmsSender smsSender;

    public void sendSmsToQueue(Destination destination, final String message) {
        jmsTemplate.convertAndSend(destination, message);
    }

    @JmsListener(destination = "sms.queue")
    public void doSendSmsMessage(String text) {
        JSONObject jsonObject = JSON.parseObject(text);
        smsSender.sendSms(jsonObject.getString("tel"), jsonObject.getString("tplId"), jsonObject.getString("verCode"));
    }
}
