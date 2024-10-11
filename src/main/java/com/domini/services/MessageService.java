package com.domini.services;

import com.domini.model.Message;
import com.domini.model.User;
import com.domini.repository.MessageRepository;
import com.domini.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotoUploadService photoUploadService;

    public Message sendMessage(String senderUsername, String recipientUsername, String content, MultipartFile file) throws IOException {
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User recipient = userRepository.findByUsername(recipientUsername)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));

        Message message = new Message();
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        message.setSender(sender);
        message.setRecipient(recipient);

        if (file != null && !file.isEmpty()) {
            String photoUrl = photoUploadService.uploadPhoto(file);  // Загружаем фото
            message.setPhotoUrl(photoUrl);  // Устанавливаем ссылку на фото
        }

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

    public List<User> getUsersWithConversations(String username) {
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return messageRepository.findUsersWithConversations(currentUser);
    }

    public List<Message> getConversation(String currentUsername, String otherUsername) {
        User currentUser = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
        User otherUser = userRepository.findByUsername(otherUsername)
                .orElseThrow(() -> new RuntimeException("Other user not found"));

        return messageRepository.findConversationBetweenUsers(currentUser, otherUser);
    }
}
