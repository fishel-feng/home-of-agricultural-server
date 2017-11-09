package com.fx.homeofagriculturalserver.common.response;

import com.fx.homeofagriculturalserver.common.constants.Constants;
import lombok.Data;

@Data
public class ApiResult<T> {

    private int code = Constants.RESP_STATUS_OK;

    private String message;

    private T data;
}
