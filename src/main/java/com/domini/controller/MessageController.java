package com.domini.controller;

import com.domini.model.Message;
import com.domini.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
            @RequestParam String content) {
        return messageService.sendMessage(senderUsername, recipientUsername, content);
    }

    @GetMapping("/sent")
    public List<Message> getSentMessages(@RequestParam String senderUsername) {
        return messageService.getMessagesBySender(senderUsername);
    }

    @GetMapping("/received")
    public List<Message> getReceivedMessages(@RequestParam String recipientUsername) {
        return messageService.getMessagesByRecipient(recipientUsername);
    }
}
