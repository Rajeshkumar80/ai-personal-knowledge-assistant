package com.example.aipersonalassistant.controller;

import com.example.aipersonalassistant.entity.Document;
import com.example.aipersonalassistant.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/document")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(
            @RequestParam("file")
            MultipartFile file
    ) throws Exception {

        documentService.uploadDocument(file);

        return ResponseEntity.ok(
                "Document Uploaded Successfully"
        );

    }

    @GetMapping
    public List<Document> getDocuments() {

        return documentService.getAllDocuments();

    }

}