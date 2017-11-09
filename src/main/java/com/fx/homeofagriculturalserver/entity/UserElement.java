package com.fx.homeofagriculturalserver.entity;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class UserElement {

    private Long tel;

    private String token;

    private String platform;

    private String pushUserId;

    private String pushChannelId;

    public Map<String, String> toMap() {
        Map<String, String> map = new HashMap<>();
        map.put("platform", this.platform);
        map.put("userId", this.tel + "");
        map.put("token", token);
        if (this.pushUserId != null) {
            map.put("pushUserId", this.pushUserId);
        }
        if (this.pushChannelId != null) {
            map.put("pushChannelId", this.pushChannelId);
        }
        return map;
    }

    public static UserElement fromMap(Map<String, String> map) {
        UserElement userElement = new UserElement();
        userElement.setPlatform(map.get("platform"));
        userElement.setToken(map.get("token"));
        userElement.setTel(Long.parseLong(map.get("tel")));
        userElement.setPushUserId(map.get("pushUserId"));
        userElement.setPushChannelId(map.get("pushChannelId"));
        return userElement;
    }
}
