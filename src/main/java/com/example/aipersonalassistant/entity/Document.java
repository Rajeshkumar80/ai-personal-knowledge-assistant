package com.example.aipersonalassistant.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents", indexes = {
        @Index(name = "idx_document_file_name", columnList = "fileName"),
        @Index(name = "idx_document_upload_date", columnList = "uploadDate")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileType;

    @Column
    private Long fileSize;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime uploadDate;

    @Column
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Builder.Default
    @Column(nullable = false)
    private Integer chunkCount = 0;

    @Builder.Default
    @Column(nullable = false)
    private Boolean deleted = false;
}
