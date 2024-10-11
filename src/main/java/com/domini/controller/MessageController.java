package com.domini.controller;

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
            @RequestParam String senderUsername,
            @RequestParam String recipientUsername,
            @RequestParam String content,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return messageService.sendMessage(senderUsername, recipientUsername, content, file);
    }

    @GetMapping("/sent")
    public List<Message> getSentMessages(@RequestParam String senderUsername) {
        return messageService.getMessagesBySender(senderUsername);
    }

    @GetMapping("/received")
    public List<Message> getReceivedMessages(@RequestParam String recipientUsername) {
        return messageService.getMessagesByRecipient(recipientUsername);
    }

    @GetMapping("/conversations")
    public List<User> getConversations(@RequestParam String username) {
        return messageService.getUsersWithConversations(username);
    }

    @GetMapping("/conversation")
    public List<Message> getConversation(
            @RequestParam String currentUsername,
            @RequestParam String otherUsername) {
        return messageService.getConversation(currentUsername, otherUsername);
    }
}
