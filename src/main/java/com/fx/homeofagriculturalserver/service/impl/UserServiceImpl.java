package com.fx.homeofagriculturalserver.service.impl;

import com.alibaba.fastjson.JSON;
import com.fx.homeofagriculturalserver.common.cache.CommonCacheUtil;
import com.fx.homeofagriculturalserver.common.constants.Constants;
import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.common.utils.Base64Util;
import com.fx.homeofagriculturalserver.common.utils.MD5Util;
import com.fx.homeofagriculturalserver.common.utils.QiNiuUtil;
import com.fx.homeofagriculturalserver.common.utils.RandomNumberCode;
import com.fx.homeofagriculturalserver.dao.UserMapper;
import com.fx.homeofagriculturalserver.entity.User;
import com.fx.homeofagriculturalserver.entity.UserElement;
import com.fx.homeofagriculturalserver.entity.UserInfo;
import com.fx.homeofagriculturalserver.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.activemq.command.ActiveMQQueue;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.jms.Destination;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private static final String SMS_QUEUE = "sms.queue";

    private static final String VERIFICATION_CODE_PREFIX = "verify.code.";

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private CommonCacheUtil cacheUtil;

    @Autowired
    private SmsProcessor smsProcessor;

    @Override
    @Transactional
    public void signIn(Long tel, String password, String verificationCode) throws MyServerException {
        try {
            User user = new User();
            user.setTel(tel);
            user.setPassword(password);
            String verCode = cacheUtil.getCacheValue(tel.toString());
            if (!verificationCode.equals(verCode)) {
                throw new Exception("验证码输入错误");
            }
            int code = userMapper.insertSelective(user);
            if (code != 1) {
                throw new MyServerException("该账号已注册");
            }
        } catch (MyServerException e) {
            log.error("Fail to sign in", e);
            throw new MyServerException(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to sign in", e);
            throw new MyServerException("注册失败");
        }
    }

    @Override
    public void sendVerificationCode(Long tel, String ipFromRequest) throws MyServerException {
        try {
            String verCode = RandomNumberCode.verCoder();
            int result = cacheUtil.cacheForVerificationCode(VERIFICATION_CODE_PREFIX + tel, verCode, "reg", 60, ipFromRequest);
            if (result == 1) {
                log.info("当前验证码未过期，请稍后重试");
                throw new MyServerException("当前验证码未过期，请稍后重试");
            } else if (result == 2) {
                log.info("超过当日验证码次数上线");
                throw new MyServerException("超过当日验证码次数上限");
            } else if (result == 3) {
                log.info("超过当日验证码次数上限 {}", ipFromRequest);
                throw new MyServerException(ipFromRequest + "超过当日验证码次数上限");
            }
            log.info("Sending verify code {} for phone {}", verCode, tel);
            Destination destination = new ActiveMQQueue(SMS_QUEUE);
            Map<String, String> smsParam = new HashMap<>();
            smsParam.put("tel", tel.toString());
            smsParam.put("tplId", Constants.MDSMS_VERCODE_TPLID);
            smsParam.put("verCode", verCode);
            String message = JSON.toJSONString(smsParam);
            smsProcessor.sendSmsToQueue(destination, message);
        } catch (Exception e) {
            throw new MyServerException(e.getMessage());
        }
    }

    @Override
    public String login(UserInfo userInfo) throws MyServerException {
        String token = null;
        try {
            Long tel = userInfo.getTel();
            String password = new String(Base64Util.decode(userInfo.getPassword()));
            if (StringUtils.isBlank(tel.toString()) || StringUtils.isBlank(password)) {
                throw new MyServerException("参数校验失败");
            }
            User user = userMapper.selectByPrimaryKey(tel);
            if (user == null) {
                throw new MyServerException("用户未注册");
            }
            String pwd = user.getPassword();
            if (!Objects.equals(pwd, password)) {
                throw new MyServerException("密码错误");
            }
            try {
                token = generateToken(user);
            } catch (Exception e) {
                throw new MyServerException("生成token失败");
            }
            UserElement userElement = new UserElement();
            userElement.setTel(tel);
            userElement.setToken(token);
            userElement.setPlatform(userInfo.getPlatform());
            userElement.setPushChannelId(userInfo.getPushChannelId());
            cacheUtil.putTokenWhenLogin(userElement);
        } catch (MyServerException e) {
            throw new MyServerException(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to login", e);
            throw new MyServerException("登录失败");
        }
        return token;
    }

    @Override
    public void modifyInfo(User user) throws MyServerException {
        userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public void uploadImg(MultipartFile file, Long tel) throws MyServerException {
        try {
            User user = userMapper.selectByPrimaryKey(tel);
            String imgUrlName = QiNiuUtil.uploadImg(file);
            user.setImg(imgUrlName);
            userMapper.updateByPrimaryKeySelective(user);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new MyServerException("头像上传失败");
        }
    }

    private String generateToken(User user) {
        String source = user.getTel() + ":" + System.currentTimeMillis();
        return MD5Util.getMD5(source);
    }
}
