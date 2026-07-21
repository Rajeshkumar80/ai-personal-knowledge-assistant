package com.example.aipersonalassistant.service;

import com.example.aipersonalassistant.entity.DocumentEntity;
import com.example.aipersonalassistant.repository.DocumentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class VectorStoreService {

    private final VectorStore vectorStore;
    private final DocumentRepository documentRepository;
    private boolean vectorStoreAvailable = true;

    public VectorStoreService(@Lazy VectorStore vectorStore, DocumentRepository documentRepository) {
        this.vectorStore = vectorStore;
        this.documentRepository = documentRepository;
    }


    public void storeChunks(List<Document> documents) {
        if (vectorStoreAvailable) {
            try {
                vectorStore.add(documents);
                log.info("Chunks stored successfully in vector store ({} documents)", documents.size());
            } catch (Exception e) {
                log.warn("Vector store (ChromaDB) unavailable, using database storage: {}", e.getMessage());
                vectorStoreAvailable = false;
                saveChunksToDatabase(documents);
            }
        } else {
            saveChunksToDatabase(documents);
        }
    }

    public void storeChunk(String chunk, Map<String, Object> metadata) {
        Document document = new Document(chunk);
        document.getMetadata().putAll(metadata);
        
        if (vectorStoreAvailable) {
            try {
                vectorStore.add(List.of(document));
                log.debug("Single chunk stored in vector store (ChromaDB)");
            } catch (Exception e) {
                log.warn("ChromaDB vector store unavailable for single chunk, using database: {}", e.getMessage());
                vectorStoreAvailable = false;
            }
        }
        
        saveChunkToDatabase(document);
    }

    public List<Document> similaritySearch(String question) {
        return similaritySearch(question, 5);
    }

    public List<Document> similaritySearch(String question, int topK) {
        if (vectorStoreAvailable) {
            try {
                SearchRequest request = SearchRequest.builder()
                        .query(question)
                        .topK(topK)
                        .similarityThreshold(0.0)
                        .build();
                return vectorStore.similaritySearch(request);
            } catch (Exception e) {
                log.warn("ChromaDB similarity search failed, using database fallback: {}", e.getMessage());
                vectorStoreAvailable = false;
            }
        }
        
        return searchDatabaseChunks(question, topK);
    }

    public void deleteDocuments(List<String> ids) {
        if (vectorStoreAvailable) {
            try {
                vectorStore.delete(ids);
            } catch (Exception e) {
                log.warn("ChromaDB vector store delete failed: {}", e.getMessage());
                vectorStoreAvailable = false;
            }
        }
        
        documentRepository.deleteByIdIn(ids.stream().map(Long::valueOf).collect(Collectors.toList()));
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<Document> getAllChunks() {
        return documentRepository.findAll().stream()
                .map(entity -> {
                    Document doc = new Document(entity.getChunkText());
                    doc.getMetadata().putAll(entity.getMetadata());
                    return doc;
                })
                .collect(Collectors.toList());
    }

    private void saveChunksToDatabase(List<Document> documents) {
        for (Document doc : documents) {
            DocumentEntity entity = new DocumentEntity();
            entity.setChunkText(doc.getText());
            entity.setMetadata(doc.getMetadata());
            entity.setFileName(doc.getMetadata().containsKey("fileName") ? 
                doc.getMetadata().get("fileName").toString() : "unknown");
            documentRepository.save(entity);
        }
        log.info("Chunks stored successfully in database ({} documents)", documents.size());
    }
    
    private void saveChunkToDatabase(Document document) {
        DocumentEntity entity = new DocumentEntity();
        entity.setChunkText(document.getText());
        entity.setMetadata(document.getMetadata());
        entity.setFileName(document.getMetadata().containsKey("fileName") ? 
            document.getMetadata().get("fileName").toString() : "unknown");
        documentRepository.save(entity);
    }
    
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<Document> searchDatabaseChunks(String question, int topK) {
        List<DocumentEntity> entities = documentRepository.findByChunkTextContainingIgnoreCase(question, topK);
        return entities.stream()
                .map(entity -> {
                    Document doc = new Document(entity.getChunkText());
                    doc.getMetadata().putAll(entity.getMetadata());
                    return doc;
                })
                .collect(Collectors.toList());
    }
}
