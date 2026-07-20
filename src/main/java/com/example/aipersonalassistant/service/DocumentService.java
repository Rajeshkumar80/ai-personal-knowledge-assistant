package com.example.aipersonalassistant.service;

import com.example.aipersonalassistant.entity.Document;
import com.example.aipersonalassistant.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    private final TextExtractionService textExtractionService;

    private final ChunkingService chunkingService;

    private final EmbeddingService embeddingService;

    private final ChromaService chromaService;

    public void uploadDocument(MultipartFile file) throws Exception {

        // 1. Extract text

        String extractedText = textExtractionService.extractText(file);

        // 2. Split into chunks

        List<String> chunks =
                chunkingService.createChunks(extractedText);

        // 3. Save metadata

        Document document =
                Document.builder()
                        .fileName(file.getOriginalFilename())
                        .fileType(file.getContentType())
                        .uploadDate(LocalDateTime.now())
                        .build();

        documentRepository.save(document);

        // 4. Store every chunk inside Chroma

        int chunkNumber = 1;

        for (String chunk : chunks) {

            float[] embedding =
                    embeddingService.generateEmbedding(chunk);

            Map<String,Object> metadata = new HashMap<>();

metadata.put("fileName", file.getOriginalFilename());

metadata.put("chunkNumber", chunkNumber);

metadata.put("documentId", document.getId());

chromaService.storeEmbedding(
        chunk,
        embedding,
        metadata
);

            chunkNumber++;

        }

        System.out.println("===================================");

        System.out.println("Upload Successful");

        System.out.println("File : "
                + file.getOriginalFilename());

        System.out.println("Chunks : "
                + chunks.size());

        System.out.println("===================================");

    }

    public List<Document> getAllDocuments() {

        return documentRepository.findAll();

    }
    

}