package com.example.aipersonalassistant.repository;

import com.example.aipersonalassistant.entity.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<DocumentEntity, Long> {

    @Query("SELECT d FROM DocumentEntity d WHERE LOWER(d.chunkText) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY d.createdAt DESC")
    List<DocumentEntity> findByChunkTextContainingIgnoreCase(@Param("keyword") String keyword, int limit);

    List<DocumentEntity> findByFileName(String fileName);

    @Modifying
    @Transactional
    @Query("DELETE FROM DocumentEntity d WHERE d.id IN :ids")
    void deleteByIdIn(@Param("ids") List<Long> ids);
}