package com.example.aipersonalassistant.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class TextExtractionService {

    public String extractText(MultipartFile file) throws Exception {
        String fileName = file.getOriginalFilename();
        if (fileName == null) {
            throw new IllegalArgumentException("Invalid file.");
        }

        String ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

        return switch (ext) {
            case "pdf" -> extractPdf(file);
            case "docx" -> extractDocx(file);
            case "txt" -> extractTxt(file);
            case "png", "jpg", "jpeg" -> extractImage(file);
            default -> throw new IllegalArgumentException("Unsupported file type: " + ext);
        };
    }

    private String extractPdf(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        var document = Loader.loadPDF(bytes);
        try {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        } finally {
            document.close();
        }
    }

    private String extractDocx(MultipartFile file) throws IOException {
        XWPFDocument document = new XWPFDocument(file.getInputStream());
        try {
            XWPFWordExtractor extractor = new XWPFWordExtractor(document);
            try {
                return extractor.getText();
            } finally {
                extractor.close();
            }
        } finally {
            document.close();
        }
    }

    private String extractTxt(MultipartFile file) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line).append("\n");
        }
        reader.close();
        return sb.toString();
    }

    private String extractImage(MultipartFile file) throws IOException, TesseractException {
        File temp = File.createTempFile("image", ".png");
        try {
            file.transferTo(temp);
            Tesseract tesseract = new Tesseract();
            tesseract.setDatapath("tessdata");
            return tesseract.doOCR(temp);
        } catch (Exception e) {
            throw new IOException("Failed to extract image text: " + e.getMessage(), e);
        } finally {
            if (temp.exists()) {
                temp.delete();
            }
        }
    }
}
