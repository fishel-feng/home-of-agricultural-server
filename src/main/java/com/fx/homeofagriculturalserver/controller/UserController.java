package com.fx.homeofagriculturalserver.controller;

import com.fx.homeofagriculturalserver.common.constants.Constants;
import com.fx.homeofagriculturalserver.common.controller.BaseController;
import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.common.response.ApiResult;
import com.fx.homeofagriculturalserver.common.utils.Base64Util;
import com.fx.homeofagriculturalserver.entity.User;
import com.fx.homeofagriculturalserver.entity.UserElement;
import com.fx.homeofagriculturalserver.entity.UserInfo;
import com.fx.homeofagriculturalserver.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("user")
@Slf4j
public class UserController extends BaseController {

    @Autowired
    @Qualifier("userServiceImpl")
    private UserService userService;

    @PostMapping("signIn")
    public ApiResult signIn(@RequestBody UserInfo userInfo) {
        ApiResult resp = new ApiResult();
        try {
            Long tel = userInfo.getTel();
            String password = new String(Base64Util.decode(userInfo.getPassword()));
            String verificationCode = userInfo.getVerificationCode();
            if (StringUtils.isBlank(tel.toString()) || StringUtils.isBlank(password) || StringUtils.isBlank(verificationCode)) {
                throw new MyServerException("参数校验失败");
            }
            userService.signIn(tel, password, verificationCode);
            resp.setCode(Constants.RESP_STATUS_OK);
            resp.setMessage("注册成功");
        } catch (MyServerException e) {
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to login", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PostMapping("sendVerificationCode")
    public ApiResult sendVerificationCode(@RequestBody UserInfo userInfo, HttpServletRequest request) {
        ApiResult resp = new ApiResult();
        try {
            userService.sendVerificationCode(userInfo.getTel(), getIpFromRequest(request));
        } catch (MyServerException e) {
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to send sms VerificationCode", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PostMapping("login")
    public ApiResult<String> login(@RequestBody UserInfo userInfo) {
        ApiResult<String> resp = new ApiResult<>();
        try {
            String token = userService.login(userInfo);
            resp.setData(token);
        } catch (MyServerException e) {
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to login", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PostMapping("modifyInfo")
    public ApiResult modifyInfo(@RequestBody User user) {
        ApiResult resp = new ApiResult();
        try {
            UserElement userElement = getCurrentUser();
            user.setTel(userElement.getTel());
            userService.modifyInfo(user);
        } catch (MyServerException e) {
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to login", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PostMapping("uploadImg")
    public ApiResult uploadImg(@RequestParam(required = false) MultipartFile file) {
        ApiResult<String> resp = new ApiResult<>();
        try {
            UserElement userElement = getCurrentUser();
            userService.uploadImg(file, userElement.getTel());
            resp.setMessage("上传成功");
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to update user info", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }



//    public static void main(String[] args) {
//        System.out.println(Base64Util.encode(MD5Util.getMD5("123").getBytes()));
//    }

}
