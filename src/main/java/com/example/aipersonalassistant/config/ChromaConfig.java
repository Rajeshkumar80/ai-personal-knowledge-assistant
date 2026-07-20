package com.example.aipersonalassistant.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.chroma.vectorstore.ChromaApi;
import org.springframework.ai.chroma.vectorstore.ChromaVectorStore;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.client.RestClient;

@Configuration
public class ChromaConfig {

    @Value("${spring.ai.vectorstore.chroma.client.host:http://localhost}")
    private String chromaHost;

    @Value("${spring.ai.vectorstore.chroma.client.port:8000}")
    private int chromaPort;

    @Value("${spring.ai.vectorstore.chroma.collection-name:documents}")
    private String collectionName;

    @Bean
    @Lazy
    public ChromaApi chromaApi(ObjectMapper objectMapper) {
        String baseUrl = chromaHost + ":" + chromaPort;
        return new ChromaApi(baseUrl, RestClient.builder(), objectMapper);
    }

    @Bean
    @Lazy
    public org.springframework.ai.vectorstore.VectorStore vectorStore(
            @Lazy ChromaApi chromaApi,
            EmbeddingModel embeddingModel) {

        return ChromaVectorStore.builder(chromaApi, embeddingModel)
                .collectionName(collectionName)
                .initializeSchema(true)
                .build();
    }
}
