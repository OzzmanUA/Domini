package com.domini.services;

import com.domini.dtos.MessageDTO;
import com.domini.dtos.UserToMessageDTO;
import com.domini.model.Message;
import com.domini.model.User;
import com.domini.repository.MessageRepository;
import com.domini.repository.UserRepository;
import com.domini.utils.JwtTokenUtils;
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
    private UserService userService;

    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @Autowired
    private PhotoUploadService photoUploadService;

    public User extractUserFromToken(String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        String username = jwtTokenUtils.getUsernameFromToken(token);
        return userService.getUserByUsername(username);
    }

    // Отправка сообщения с возможностью прикрепления фотографии
    public Message sendMessage(String authorizationHeader, Long recipientId, String content, MultipartFile file) throws IOException {
        User sender = extractUserFromToken(authorizationHeader);
        User recipient = userService.getUserById(recipientId);

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

    // Получение сообщений по ID отправителя
    public List<Message> getSentMessages(String authorizationHeader) {
        User sender = extractUserFromToken(authorizationHeader);
        return messageRepository.findBySenderOrderByTimestampAsc(sender);
    }

    // Получение сообщений по ID получателя
    public List<Message> getReceivedMessages(String authorizationHeader) {
        User recipient = extractUserFromToken(authorizationHeader);
        return messageRepository.findByRecipientOrderByTimestampAsc(recipient);
    }

//    // Получение списка пользователей, с которыми велись разговоры
    public List<UserToMessageDTO> getUsersWithConversationsById(Long userId) {
        User currentUser = userService.getCurrentUser();

        return messageRepository.findUsersWithConversations(currentUser)
                .stream()
                .map(user -> new UserToMessageDTO(user.getId(), user.getPrivateInformation().getFirstName(), user.getPrivateInformation().getLastName())) // Добавьте аватар, если нужно
                .collect(Collectors.toList());
    }

    // Получение всей переписки между двумя пользователями
    public List<Message> getConversation(String authorizationHeader, Long otherUserId) {
        User currentUser = extractUserFromToken(authorizationHeader);
        User otherUser = userService.getUserById(otherUserId);

        return messageRepository.findBySenderAndRecipientOrRecipientAndSenderOrderByTimestampAsc(currentUser, otherUser, otherUser, currentUser);
    }

    public List<MessageDTO> getConversationByUserIds(Long currentUserId, Long otherUserId) {
        User currentUser = userService.getUserById(currentUserId);
        User otherUser = userService.getUserById(otherUserId);

        List<Message> messages = messageRepository.findBySenderAndRecipientOrRecipientAndSenderOrderByTimestampAsc(currentUser, otherUser, otherUser, currentUser);

        return messages.stream().map(message -> new MessageDTO(
                message.getId(),
                message.getContent(),
                message.getTimestamp(),
                message.getSender().getPrivateInformation().getFirstName() + " " + message.getSender().getPrivateInformation().getLastName(),
                message.getRecipient().getPrivateInformation().getFirstName() + " " + message.getRecipient().getPrivateInformation().getLastName()
                //message.getPhotoUrl()
        )).collect(Collectors.toList());
    }
}
