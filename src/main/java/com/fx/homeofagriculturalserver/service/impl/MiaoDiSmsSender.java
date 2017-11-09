package com.fx.homeofagriculturalserver.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fx.homeofagriculturalserver.common.constants.Constants;
import com.fx.homeofagriculturalserver.common.utils.HttpUtil;
import com.fx.homeofagriculturalserver.common.utils.MD5Util;
import com.fx.homeofagriculturalserver.service.SmsSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service("verCodeService")
@Slf4j
public class MiaoDiSmsSender implements SmsSender {

    private static String operation = "/industrySMS/sendSMS";

    @Override
    public void sendSms(String phone, String tplId, String params) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
            String timestamp = sdf.format(new Date());
            String sig = MD5Util.getMD5(Constants.MDSMS_ACCOUNT_SID + Constants.MDSMS_AUTH_TOKEN + timestamp);
            String url = Constants.MDSMS_REST_URL + operation;
            Map<String, String> param = new HashMap<>();
            param.put("accountSid", Constants.MDSMS_ACCOUNT_SID);
            param.put("to", phone);
            param.put("templateid", tplId);
            param.put("param", params);
            param.put("timestamp", timestamp);
            param.put("sig", sig);
            param.put("respDataType", "json");
            String result = HttpUtil.post(url, param);
            JSONObject jsonObject = JSON.parseObject(result);
            if (!jsonObject.getString("respCode").equals("00000")) {
                log.error("Fail to send sms to " + phone + ":" + params + ":" + result);
            }
        } catch (Exception e) {
            log.error("Fail to send sms to " + phone + ":" + params);
        }
    }
}
