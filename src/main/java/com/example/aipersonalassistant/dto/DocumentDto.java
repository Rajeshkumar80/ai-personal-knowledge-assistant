package com.example.aipersonalassistant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentDto {

    private Long id;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private String description;
    private LocalDateTime uploadDate;
    private Integer chunkCount;
}
