package com.example.aipersonalassistant.repository;

import com.example.aipersonalassistant.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentJpaRepository extends JpaRepository<Document, Long> {

    List<Document> findByDeletedFalseOrderByUploadDateDesc();

    long countByDeletedFalse();

    @Query("SELECT COALESCE(SUM(d.chunkCount), 0) FROM Document d WHERE d.deleted = false")
    long sumChunksByDeletedFalse();

    @Query("SELECT COALESCE(SUM(d.fileSize), 0) FROM Document d WHERE d.deleted = false")
    long sumFileSizeByDeletedFalse();
}
