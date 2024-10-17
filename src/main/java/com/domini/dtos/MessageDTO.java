package com.domini.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageDTO {
    private Long id;
    private String content;
    private LocalDateTime timestamp;
    private String senderName;
    private String recipientName;
//    private String photoUrl;

    public MessageDTO(Long id, String content, LocalDateTime timestamp, String senderName, String recipientName) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.senderName = senderName;
        this.recipientName = recipientName;
//        this.photoUrl = photoUrl;
    }
}
