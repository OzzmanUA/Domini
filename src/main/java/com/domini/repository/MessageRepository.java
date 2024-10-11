package com.domini.repository;

import com.domini.model.Message;
import com.domini.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySenderOrderByTimestampAsc(User sender);
    List<Message> findByRecipientOrderByTimestampAsc(User recipient);
    List<Message> findConversationBetweenUsersOrderByTimestampAsc(User sender, User recipient);
    List<User> findUsersWithConversations(User currentUser);
}
