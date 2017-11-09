package com.fx.homeofagriculturalserver.service.impl;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.common.utils.QiNiuUtil;
import com.fx.homeofagriculturalserver.dao.ImageMapper;
import com.fx.homeofagriculturalserver.entity.Image;
import com.fx.homeofagriculturalserver.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageMapper imageMapper;

    @Override
    public void uploadImage(byte type, int targetId, MultipartFile file) throws MyServerException {
        try {
            Image image = new Image();
            image.setType(type);
            image.setTargetId(targetId);
            try {
                String imgUrl = QiNiuUtil.uploadImg(file);
                image.setContent(imgUrl);
            } catch (IOException e) {
                throw new MyServerException("图片上传异常");
            }
            imageMapper.insertSelective(image);
        } catch (Exception e) {
            throw new MyServerException(e.getMessage());
        }
    }
}
