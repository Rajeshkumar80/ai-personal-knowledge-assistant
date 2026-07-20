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

    /**
     * Store document chunk inside ChromaDB
     */
    public void storeEmbedding(
            String chunk,
            float[] embedding,
            Map<String, Object> metadata
    ) {

        Document document = new Document(chunk);

        document.getMetadata().putAll(metadata);

        /*
         Spring AI automatically generates embeddings while
         storing if an EmbeddingModel is configured.

         Therefore the embedding parameter is currently unused,
         but we keep it so we can support manual embeddings later.
        */

        vectorStore.add(List.of(document));

    }

    /**
     * Search similar chunks
     */
    public List<Document> similaritySearch(String question) {

        SearchRequest request = SearchRequest.builder()
                .query(question)
                .topK(5)
                .build();

        return vectorStore.similaritySearch(request);

    }

    /**
     * Search with custom topK
     */
    public List<Document> similaritySearch(
            String question,
            int topK
    ) {

        SearchRequest request = SearchRequest.builder()
                .query(question)
                .topK(topK)
                .build();

        return vectorStore.similaritySearch(request);

    }

    /**
     * Store multiple chunks
     */
    public void storeDocuments(List<Document> documents) {

        vectorStore.add(documents);

    }

    /**
     * Delete vectors
     */
    public void deleteDocuments(List<String> ids) {

        vectorStore.delete(ids);

    }

}