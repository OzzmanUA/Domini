package com.domini.service;

import com.domini.model.Message;
import com.domini.model.User;
import com.domini.repository.MessageRepository;
import com.domini.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Message sendMessage(String senderUsername, String recipientUsername, String content) {
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User recipient = userRepository.findByUsername(recipientUsername)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));

        Message message = new Message();
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        message.setSender(sender);
        message.setRecipient(recipient);

        return messageRepository.save(message);
    }

    public List<Message> getMessagesBySender(String senderUsername) {
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        return messageRepository.findBySender(sender);
    }

    public List<Message> getMessagesByRecipient(String recipientUsername) {
        User recipient = userRepository.findByUsername(recipientUsername)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        return messageRepository.findByRecipient(recipient);
    }
}
