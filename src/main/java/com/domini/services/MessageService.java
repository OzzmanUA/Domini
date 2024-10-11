package com.domini.services;

import com.domini.dtos.UserToMessageDTO;
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
import java.util.stream.Collectors;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotoUploadService photoUploadService;

    public Message sendMessageById(Long senderId, Long recipientId, String content, MultipartFile file) throws IOException {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));

        Message message = new Message();
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        message.setSender(sender);
        message.setRecipient(recipient);

        if (file != null && !file.isEmpty()) {
            String photoUrl = photoUploadService.uploadPhoto(file);
            message.setPhotoUrl(photoUrl);
        }

        return messageRepository.save(message);
    }

    public List<Message> getMessagesBySenderId(Long senderId) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        return messageRepository.findBySenderOrderByTimestampAsc(sender);
    }

    public List<Message> getMessagesByRecipientId(Long recipientId) {
        User recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));
        return messageRepository.findByRecipientOrderByTimestampAsc(recipient);
    }

    public List<UserToMessageDTO> getUsersWithConversationsById(Long userId) {
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return messageRepository.findUsersWithConversations(currentUser)
                .stream()
                .map(user -> new UserToMessageDTO(user.getId(), user.getPrivateInformation().getFirstName(), user.getPrivateInformation().getLastName()))//, user.getPrivateInformation().getAvatarUrl()
                .collect(Collectors.toList());
    }

    public List<Message> getConversationByUserIds(Long currentUserId, Long otherUserId) {
        User currentUser = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));
        User otherUser = userRepository.findById(otherUserId)
                .orElseThrow(() -> new RuntimeException("Other user not found"));

        return messageRepository.findConversationBetweenUsersOrderByTimestampAsc(currentUser, otherUser);
    }
}
