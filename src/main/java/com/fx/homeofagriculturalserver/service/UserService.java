package com.fx.homeofagriculturalserver.service;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.entity.User;
import com.fx.homeofagriculturalserver.entity.UserInfo;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    void signIn(Long tel, String password, String verificationCode) throws MyServerException;

    void sendVerificationCode(Long tel, String ipFromRequest) throws MyServerException;

    String login(UserInfo userInfo) throws MyServerException;

    void modifyInfo(User user) throws MyServerException;

    void uploadImg(MultipartFile file, Long tel) throws MyServerException;
}
