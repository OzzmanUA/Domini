package com.domini.repository;

import com.domini.model.Message;
import com.domini.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySenderOrderByTimestampAsc(User sender);  // для сообщений по отправителю
    List<Message> findByRecipientOrderByTimestampAsc(User recipient);  // для сообщений по получателю
    @Query("SELECT m FROM Message m WHERE (m.sender = :user1 AND m.recipient = :user2) OR (m.sender = :user2 AND m.recipient = :user1) ORDER BY m.timestamp ASC")
    List<Message> findConversationBetweenUsers(@Param("user1") User user1, @Param("user2") User user2);
    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.recipient = :currentUser " +
            "UNION " +
            "SELECT DISTINCT m.recipient FROM Message m WHERE m.sender = :currentUser")
    List<User> findUsersWithConversations(@Param("currentUser") User currentUser);  // для пользователей, с которыми велись разговоры
}
