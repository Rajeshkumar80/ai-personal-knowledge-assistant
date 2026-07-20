package com.example.aipersonalassistant.repository;

import com.example.aipersonalassistant.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {

}