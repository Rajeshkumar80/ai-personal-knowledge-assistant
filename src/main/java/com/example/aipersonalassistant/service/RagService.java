package com.example.aipersonalassistant.service;

import com.example.aipersonalassistant.dto.ChatRequest;
import com.example.aipersonalassistant.dto.ChatResponse;
import com.example.aipersonalassistant.entity.ChatHistory;
import com.example.aipersonalassistant.repository.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RagService {

    private final ChromaService chromaService;

    private final OllamaService ollamaService;

    private final ChatHistoryRepository chatHistoryRepository;

    public ChatResponse ask(ChatRequest request) {

        List<Document> documents =
                chromaService.similaritySearch(
                        request.getQuestion()
                );

        StringBuilder context = new StringBuilder();

        String sourceFile = "Unknown";

        Integer pageNumber = 0;

        for (Document document : documents) {

            context.append(document.getText());

            context.append("\n\n");

            if (document.getMetadata().containsKey("fileName")) {

                sourceFile =
                        document.getMetadata()
                                .get("fileName")
                                .toString();

            }

            if (document.getMetadata().containsKey("pageNumber")) {

                pageNumber =
                        Integer.parseInt(
                                document.getMetadata()
                                        .get("pageNumber")
                                        .toString()
                        );

            }

        }

        String prompt =
                """
                You are an AI assistant.

                Answer ONLY from the provided context.

                If the answer is not present,
                reply exactly:

                I couldn't find the answer in the uploaded documents.

                Context:

                %s

                Question:

                %s
                """.formatted(
                        context,
                        request.getQuestion()
                );

        String answer =
                ollamaService.askLLM(prompt);

        ChatHistory history =
                ChatHistory.builder()
                        .question(request.getQuestion())
                        .answer(answer)
                        .sourceFile(sourceFile)
                        .pageNumber(pageNumber)
                        .createdAt(LocalDateTime.now())
                        .build();

        chatHistoryRepository.save(history);

        return ChatResponse.builder()
                .answer(answer)
                .sourceFile(sourceFile)
                .pageNumber(pageNumber)
                .build();

    }

    public List<ChatHistory> getHistory() {

        return chatHistoryRepository.findAll();

    }

}