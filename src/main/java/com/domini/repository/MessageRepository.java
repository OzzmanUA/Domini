package com.domini.repository;

import com.domini.model.Message;
import com.domini.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySender(User sender);

    List<Message> findByRecipient(User recipient);

    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.recipient = :user " +
            "UNION " +
            "SELECT DISTINCT m.recipient FROM Message m WHERE m.sender = :user")
    List<User> findUsersWithConversations(@Param("user") User user);

    @Query("SELECT m FROM Message m WHERE (m.sender = :currentUser AND m.recipient = :otherUser) " +
            "OR (m.sender = :otherUser AND m.recipient = :currentUser) ORDER BY m.timestamp ASC")
    List<Message> findConversationBetweenUsers(@Param("currentUser") User currentUser, @Param("otherUser") User otherUser);
}
