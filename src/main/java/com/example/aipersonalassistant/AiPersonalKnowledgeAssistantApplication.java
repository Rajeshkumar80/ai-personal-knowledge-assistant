package com.example.aipersonalassistant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {
        org.springframework.ai.vectorstore.chroma.autoconfigure.ChromaVectorStoreAutoConfiguration.class
})
public class AiPersonalKnowledgeAssistantApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiPersonalKnowledgeAssistantApplication.class, args);
	}

}
