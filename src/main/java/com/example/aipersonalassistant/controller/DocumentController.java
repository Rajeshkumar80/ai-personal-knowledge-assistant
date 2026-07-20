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

    @SuppressWarnings("unchecked")
    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<DocumentDto>> upload(
            @RequestParam("file") MultipartFile file) {

        try {
            DocumentDto dto = documentService.uploadDocument(file);
            return ResponseEntity.ok(
                    ApiResponse.created("Document uploaded and processed successfully.", dto)
            );
        } catch (IllegalArgumentException e) {
            log.warn("Upload rejected: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body((ApiResponse<DocumentDto>) (ApiResponse<?>) ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            log.error("Upload failed for {}: {}", file.getOriginalFilename(), e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body((ApiResponse<DocumentDto>) (ApiResponse<?>) ApiResponse.error("Upload failed: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DocumentDto>>> getDocuments() {
        List<DocumentDto> docs = documentService.getAllDocuments();
        return ResponseEntity.ok(ApiResponse.ok(docs));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.ok(ApiResponse.message("Document deleted successfully."));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getStats() {
        DashboardStatsDto stats = documentService.getStats();
        return ResponseEntity.ok(ApiResponse.ok(stats));
    }
}
