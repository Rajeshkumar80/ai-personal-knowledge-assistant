package com.example.aipersonalassistant.repository;

import com.example.aipersonalassistant.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {

}