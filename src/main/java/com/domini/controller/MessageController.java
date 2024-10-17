package com.domini.controller;

import com.domini.dtos.UserToMessageDTO;
import com.domini.model.Message;
import com.domini.model.User;
import com.domini.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public Message sendMessage(
            @RequestParam Long recipientId,
            @RequestParam String content,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return messageService.sendMessage(recipientId, content, file);
    }

    @GetMapping("/sent")
    public List<Message> getSentMessages() {
        return messageService.getSentMessages();
    }

    @GetMapping("/received")
    public List<Message> getReceivedMessages() {
        return messageService.getReceivedMessages();
    }

//    @GetMapping("/conversations")
//    public List<UserToMessageDTO> getConversations(@RequestParam Long userId) {
//        return messageService.getUsersWithConversationsById(userId);
//    }

    @GetMapping("/conversation")
    public List<Message> getConversation(@RequestParam Long otherUserId) {
        return messageService.getConversation(otherUserId);
    }
}
