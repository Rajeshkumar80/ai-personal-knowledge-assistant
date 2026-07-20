package com.example.aipersonalassistant.controller;

import com.example.aipersonalassistant.dto.ApiResponse;
import com.example.aipersonalassistant.dto.ChatRequest;
import com.example.aipersonalassistant.dto.ChatResponse;
import com.example.aipersonalassistant.entity.ChatHistory;
import com.example.aipersonalassistant.service.RagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final RagService ragService;

    /**
     * Ask a question using RAG — retrieves context from ChromaDB, calls Ollama.
     */
    @PostMapping("/ask")
    public ResponseEntity<ApiResponse<ChatResponse>> ask(
            @Valid @RequestBody ChatRequest request) {

        log.info("Chat request: {}", request.getQuestion());

        ChatResponse response = ragService.ask(request);

        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    /**
     * Fetch full chat history ordered by most recent.
     */
    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<ChatHistory>>> history() {

        List<ChatHistory> history = ragService.getHistory();

        return ResponseEntity.ok(ApiResponse.ok(history));
    }

    /**
     * Clear all chat history.
     */
    @DeleteMapping("/history")
    public ResponseEntity<ApiResponse<Void>> clearHistory() {

        ragService.clearHistory();

        return ResponseEntity.ok(ApiResponse.message("Chat history cleared."));
    }
}
