package com.example.aipersonalassistant.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChunkingService {

    private static final int CHUNK_SIZE = 500;
    private static final int OVERLAP = 100;

    public List<String> createChunks(String text) {

        List<String> chunks = new ArrayList<>();

        if (text == null || text.isBlank()) {
            return chunks;
        }

        String cleaned = text.replaceAll("\\r\\n", "\n").replaceAll("[ \\t]+", " ").trim();

        int start = 0;

        while (start < cleaned.length()) {

            int end = Math.min(start + CHUNK_SIZE, cleaned.length());

            if (end < cleaned.length()) {
                // Try sentence boundary first
                int lastSentence = -1;
                for (int i = end - 1; i >= start && i >= end - 120; i--) {
                    char c = cleaned.charAt(i);
                    if ((c == '.' || c == '!' || c == '?') && i + 1 < cleaned.length()) {
                        char next = cleaned.charAt(i + 1);
                        if (next == ' ' || next == '\n') {
                            lastSentence = i + 1;
                            break;
                        }
                    }
                }

                if (lastSentence > start) {
                    end = lastSentence;
                } else {
                    // Fall back to word boundary
                    int lastSpace = cleaned.lastIndexOf(' ', end - 1);
                    if (lastSpace > start) {
                        end = lastSpace + 1;
                    }
                }
            }

            String chunk = cleaned.substring(start, end).trim();
            if (!chunk.isEmpty()) {
                chunks.add(chunk);
            }

            start = end - OVERLAP;
            if (start <= 0 || start >= cleaned.length()) {
                break;
            }
        }

        return chunks;
    }
}
