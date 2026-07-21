package com.example.aipersonalassistant.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;

@Entity
@Table(name = "document_chunks")
public class DocumentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(columnDefinition = "TEXT")
    private String chunkText;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "chunk_metadata", joinColumns = @JoinColumn(name = "chunk_id"))
    @MapKeyColumn(name = "metadata_key")
    @Column(name = "metadata_value", columnDefinition = "TEXT")
    private Map<String, Object> metadata = new HashMap<>();
    
    private String fileName;
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getChunkText() {
        return chunkText;
    }
    
    public void setChunkText(String chunkText) {
        this.chunkText = chunkText;
    }
    
    public Map<String, Object> getMetadata() {
        return metadata;
    }
    
    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }
    
    public String getFileName() {
        return fileName;
    }
    
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}