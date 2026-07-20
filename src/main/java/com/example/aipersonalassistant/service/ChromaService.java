package com.example.aipersonalassistant.service;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ChromaService {

    private final VectorStore vectorStore;

    public ChromaService(@Lazy VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void storeChunks(List<Document> documents) {
        vectorStore.add(documents);
    }

    public void storeChunk(String chunk, Map<String, Object> metadata) {
        Document document = new Document(chunk);
        document.getMetadata().putAll(metadata);
        vectorStore.add(List.of(document));
    }

    public List<Document> similaritySearch(String question) {
        return similaritySearch(question, 5);
    }

    public List<Document> similaritySearch(String question, int topK) {
        SearchRequest request = SearchRequest.builder()
                .query(question)
                .topK(topK)
                .similarityThreshold(0.0)
                .build();
        return vectorStore.similaritySearch(request);
    }

    public void deleteDocuments(List<String> ids) {
        vectorStore.delete(ids);
    }
}
