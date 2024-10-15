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
    List<Message> findBySenderAndRecipientOrRecipientAndSenderOrderByTimestampAsc(User sender1, User recipient1, User sender2, User recipient2);  // для взаимных разговоров
    @Query("SELECT DISTINCT m.sender FROM Message m WHERE m.recipient = :currentUser " +
            "UNION " +
            "SELECT DISTINCT m.recipient FROM Message m WHERE m.sender = :currentUser")
    List<User> findUsersWithConversations(@Param("currentUser") User currentUser);  // для пользователей, с которыми велись разговоры
}
