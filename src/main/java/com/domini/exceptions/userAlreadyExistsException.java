package com.domini.exceptions;

public class userAlreadyExistsException extends RuntimeException {
    public userAlreadyExistsException(String message) {
        super(message);
    }
}
