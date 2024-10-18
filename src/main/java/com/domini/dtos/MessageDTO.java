package com.domini.dtos;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
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
    @JsonSerialize(using = ToStringSerializer.class)
    private Long senderId;
    private String recipientName;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long receiverId;
//    private String photoUrl;


    public MessageDTO(Long id, String content, LocalDateTime timestamp, String senderName, Long senderId, String recipientName, Long receiverId) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.senderName = senderName;
        this.senderId = senderId;
        this.recipientName = recipientName;
        this.receiverId = receiverId;
    }
}
