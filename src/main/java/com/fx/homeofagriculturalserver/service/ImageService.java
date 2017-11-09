package com.fx.homeofagriculturalserver.service;

import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    void uploadImage(byte type,int targetId,MultipartFile file) throws MyServerException;
}
