package com.example.aipersonalassistant.controller;

import com.example.aipersonalassistant.dto.ApiResponse;
import com.example.aipersonalassistant.dto.DashboardStatsDto;
import com.example.aipersonalassistant.dto.DocumentDto;
import com.example.aipersonalassistant.service.DocumentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/document")
@RequiredArgsConstructor
@Slf4j
public class DocumentController {

    private final DocumentService documentService;

    /**
     * Upload a document and process it through the RAG pipeline.
     */
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<DocumentDto>> upload(
            @RequestParam("file") MultipartFile file) throws Exception {

        DocumentDto dto = documentService.uploadDocument(file);

        return ResponseEntity.ok(
                ApiResponse.created("Document uploaded and processed successfully.", dto)
        );
    }

    /**
     * Get all active (non-deleted) documents.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<DocumentDto>>> getDocuments() {

        List<DocumentDto> docs = documentService.getAllDocuments();

        return ResponseEntity.ok(ApiResponse.ok(docs));
    }

    /**
     * Soft-delete a document by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDocument(@PathVariable Long id) {

        documentService.deleteDocument(id);

        return ResponseEntity.ok(ApiResponse.message("Document deleted successfully."));
    }

    /**
     * Dashboard statistics: document count, chat count, chunk count, storage.
     */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getStats() {

        DashboardStatsDto stats = documentService.getStats();

        return ResponseEntity.ok(ApiResponse.ok(stats));
    }
}
