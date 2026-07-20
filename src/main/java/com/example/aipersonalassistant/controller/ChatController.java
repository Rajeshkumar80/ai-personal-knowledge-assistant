package com.example.aipersonalassistant.controller;

import com.example.aipersonalassistant.dto.ChatRequest;
import com.example.aipersonalassistant.dto.ChatResponse;
import com.example.aipersonalassistant.entity.ChatHistory;
import com.example.aipersonalassistant.service.RagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ChatController {

    private final RagService ragService;

    @PostMapping("/ask")
    public ChatResponse ask(
            @Valid
            @RequestBody ChatRequest request
    ) {

        return ragService.ask(request);

    }

    @GetMapping("/history")
    public List<ChatHistory> history() {

        return ragService.getHistory();

    }

}