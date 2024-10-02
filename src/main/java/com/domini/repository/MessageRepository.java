package com.domini.repository;

import com.domini.model.Message;
import com.domini.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySender(User sender);
    List<Message> findByRecipient(User recipient);
}
