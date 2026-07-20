package com.example.aipersonalassistant.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
public class ChromaConfig {
    // ChromaVectorStore bean is initialized lazily so the app starts
    // even when ChromaDB is temporarily unavailable.
    // Annotate injection points with @Lazy if eager init causes startup failures.
}