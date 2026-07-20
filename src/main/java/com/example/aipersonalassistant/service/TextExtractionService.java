package com.example.aipersonalassistant.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Service
public class TextExtractionService {

    public String extractText(MultipartFile file) throws Exception {

        String fileName = file.getOriginalFilename();

        if (fileName == null) {
            throw new IllegalArgumentException("Invalid file.");
        }

        String extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

        return switch (extension) {

            case "pdf" -> extractPdf(file);

            case "docx" -> extractDocx(file);

            case "txt" -> extractTxt(file);

            case "png", "jpg", "jpeg" -> extractImage(file);

            default -> throw new IllegalArgumentException("Unsupported file type.");
        };
    }

    private String extractPdf(MultipartFile file) throws IOException {

        var document = Loader.loadPDF(file.getBytes());

        PDFTextStripper stripper = new PDFTextStripper();

        String text = stripper.getText(document);

        document.close();

        return text;
    }

    private String extractDocx(MultipartFile file) throws IOException {

        XWPFDocument document = new XWPFDocument(file.getInputStream());

        XWPFWordExtractor extractor = new XWPFWordExtractor(document);

        String text = extractor.getText();

        extractor.close();

        document.close();

        return text;
    }

    private String extractTxt(MultipartFile file) throws IOException {

        BufferedReader reader =
                new BufferedReader(new InputStreamReader(file.getInputStream()));

        StringBuilder builder = new StringBuilder();

        String line;

        while ((line = reader.readLine()) != null) {

            builder.append(line).append("\n");

        }

        reader.close();

        return builder.toString();
    }

    private String extractImage(MultipartFile file)
            throws IOException, TesseractException {

        File temp = File.createTempFile("image", ".png");

        file.transferTo(temp);

        Tesseract tesseract = new Tesseract();

        tesseract.setDatapath("tessdata");

        String text = tesseract.doOCR(temp);

        temp.delete();

        return text;
    }

}