package com.fx.homeofagriculturalserver.common.exception;


import com.fx.homeofagriculturalserver.common.constants.Constants;

public class MyServerException extends Exception {

    public MyServerException(String message) {
        super(message);
    }

    public int getStatusCode() {
        return Constants.RESP_STATUS_INTERNAL_ERROR;
    }
}
