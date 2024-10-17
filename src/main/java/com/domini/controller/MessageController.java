package com.domini.controller;

import com.domini.dtos.MessageDTO;
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
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam Long recipientId,
            @RequestParam String content,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return messageService.sendMessage(authorizationHeader, recipientId, content, file);
    }

    @GetMapping("/sent")
    public List<Message> getSentMessages(@RequestHeader("Authorization") String authorizationHeader) {
        return messageService.getSentMessages(authorizationHeader);
    }

    @GetMapping("/received")
    public List<Message> getReceivedMessages(@RequestHeader("Authorization") String authorizationHeader) {
        return messageService.getReceivedMessages(authorizationHeader);
    }

    //Выводит переписку с пользователем
    @GetMapping("/conversation")
    public List<MessageDTO> getConversation(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam Long otherUserId) {
        User currentUser = messageService.extractUserFromToken(authorizationHeader);
        return messageService.getConversationByUserIds(currentUser.getId(), otherUserId);
    }

    //Выводит список пользователей с которыми есть переписка
    @GetMapping("/conversations")
    public List<UserToMessageDTO> getConversations(@RequestHeader("Authorization") String authorizationHeader) {
        User currentUser = messageService.extractUserFromToken(authorizationHeader);
        return messageService.getUsersWithConversationsById(currentUser.getId());
    }
}
