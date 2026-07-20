package com.example.aipersonalassistant.service;

import com.example.aipersonalassistant.dto.ChatRequest;
import com.example.aipersonalassistant.dto.ChatResponse;
import com.example.aipersonalassistant.entity.ChatHistory;
import com.example.aipersonalassistant.repository.ChatHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RagService {

    private final ChromaService chromaService;
    private final OllamaService ollamaService;
    private final ChatHistoryRepository chatHistoryRepository;

    public ChatResponse ask(ChatRequest request) {

        String question = request.getQuestion();
        log.info("RAG request: {}", question);

        // 1. Semantic similarity search in ChromaDB
        List<Document> documents = chromaService.similaritySearch(question);

        StringBuilder context = new StringBuilder();
        String sourceFile = null;
        Integer pageNumber = null;

        if (documents.isEmpty()) {
            log.warn("No similar documents found for question: {}", question);
        } else {
            log.info("Found {} similar document chunks", documents.size());
        }

        for (Document document : documents) {
            context.append(document.getText()).append("\n\n");

            if (sourceFile == null && document.getMetadata().containsKey("fileName")) {
                sourceFile = document.getMetadata().get("fileName").toString();
            }

            if (pageNumber == null && document.getMetadata().containsKey("pageNumber")) {
                try {
                    pageNumber = Integer.parseInt(
                            document.getMetadata().get("pageNumber").toString()
                    );
                } catch (NumberFormatException ignored) {}
            }
        }

        String contextStr = context.toString().trim();

        // 2. Build RAG prompt
        String prompt;
        if (contextStr.isEmpty()) {
            prompt = """
                    You are a helpful AI assistant.

                    No relevant documents were found for this question.
                    Please let the user know that you couldn't find relevant information in the uploaded documents, and suggest they upload documents first.

                    Question: %s
                    """.formatted(question);
        } else {
            prompt = """
                    You are a helpful AI assistant that answers questions based on uploaded documents.

                    Rules:
                    - Answer ONLY from the provided context below.
                    - Be concise, clear, and accurate.
                    - Format your response using Markdown when appropriate (lists, headings, code blocks).
                    - If the answer is not present in the context, reply exactly:
                      "I couldn't find the answer in the uploaded documents."

                    Context:
                    %s

                    Question: %s
                    """.formatted(contextStr, question);
        }

        // 3. Call local LLM
        String answer = ollamaService.askLLM(prompt);

        // 4. Persist chat history
        ChatHistory history = ChatHistory.builder()
                .question(question)
                .answer(answer)
                .sourceFile(sourceFile)
                .pageNumber(pageNumber)
                .build();

        chatHistoryRepository.save(history);

        log.info("RAG answered: source={}", sourceFile);

        return ChatResponse.builder()
                .answer(answer)
                .sourceFile(sourceFile)
                .pageNumber(pageNumber)
                .build();
    }

    public List<ChatHistory> getHistory() {
        return chatHistoryRepository.findAllByOrderByCreatedAtDesc();
    }

    public void clearHistory() {
        chatHistoryRepository.deleteAll();
        log.info("Chat history cleared.");
    }
}
