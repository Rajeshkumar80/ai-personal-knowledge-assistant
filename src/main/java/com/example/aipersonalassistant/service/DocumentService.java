package com.example.aipersonalassistant.service;

import com.example.aipersonalassistant.dto.DashboardStatsDto;
import com.example.aipersonalassistant.dto.DocumentDto;
import com.example.aipersonalassistant.entity.Document;
import com.example.aipersonalassistant.exception.ResourceNotFoundException;
import com.example.aipersonalassistant.repository.ChatHistoryRepository;
import com.example.aipersonalassistant.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ChatHistoryRepository chatHistoryRepository;
    private final TextExtractionService textExtractionService;
    private final ChunkingService chunkingService;
    private final ChromaService chromaService;

    public DocumentDto uploadDocument(MultipartFile file) throws Exception {

        log.info("Starting upload for file: {}", file.getOriginalFilename());

        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty.");
        }

        String extractedText = textExtractionService.extractText(file);

        if (extractedText == null || extractedText.isBlank()) {
            throw new IllegalArgumentException("Could not extract any text from the file.");
        }

        log.info("Extracted {} characters from {}", extractedText.length(), file.getOriginalFilename());

        List<String> chunks = chunkingService.createChunks(extractedText);

        if (chunks.isEmpty()) {
            throw new IllegalArgumentException("No chunks generated from the file content.");
        }

        log.info("Split into {} chunks", chunks.size());

        Document document = Document.builder()
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .fileSize(file.getSize())
                .chunkCount(chunks.size())
                .build();

        documentRepository.save(document);

        List<org.springframework.ai.document.Document> aiDocs = new ArrayList<>();
        for (int i = 0; i < chunks.size(); i++) {
            Map<String, Object> metadata = new HashMap<>();
            metadata.put("fileName", file.getOriginalFilename());
            metadata.put("chunkNumber", i + 1);
            metadata.put("documentId", document.getId());

            org.springframework.ai.document.Document aiDoc =
                    new org.springframework.ai.document.Document(chunks.get(i));
            aiDoc.getMetadata().putAll(metadata);
            aiDocs.add(aiDoc);
        }

        chromaService.storeChunks(aiDocs);

        log.info("Upload complete: {} | Chunks stored: {}", file.getOriginalFilename(), chunks.size());

        return toDto(document);
    }

    public List<DocumentDto> getAllDocuments() {
        return documentRepository.findByDeletedFalseOrderByUploadDateDesc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public void deleteDocument(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Document", id));
        document.setDeleted(true);
        documentRepository.save(document);
        log.info("Document soft-deleted: id={}, name={}", id, document.getFileName());
    }

    public DashboardStatsDto getStats() {
        long totalDocuments = documentRepository.countByDeletedFalse();
        long totalChats = chatHistoryRepository.count();
        long totalChunks = documentRepository.sumChunksByDeletedFalse();
        long totalBytes = documentRepository.sumFileSizeByDeletedFalse();
        String storage = formatBytes(totalBytes);

        return DashboardStatsDto.builder()
                .totalDocuments(totalDocuments)
                .totalChats(totalChats)
                .totalChunks(totalChunks)
                .totalStorage(storage)
                .build();
    }

    private DocumentDto toDto(Document doc) {
        return DocumentDto.builder()
                .id(doc.getId())
                .fileName(doc.getFileName())
                .fileType(doc.getFileType())
                .fileSize(doc.getFileSize())
                .description(doc.getDescription())
                .uploadDate(doc.getUploadDate())
                .chunkCount(doc.getChunkCount())
                .build();
    }

    private String formatBytes(long bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return String.format("%.1f KB", bytes / 1024.0);
        if (bytes < 1024 * 1024 * 1024) return String.format("%.1f MB", bytes / (1024.0 * 1024));
        return String.format("%.1f GB", bytes / (1024.0 * 1024 * 1024));
    }
}
