package com.example.aipersonalassistant.util;

import org.springframework.web.multipart.MultipartFile;

public class FileUtil {

    private FileUtil() {
    }

    public static String getFileExtension(MultipartFile file) {

        String fileName = file.getOriginalFilename();

        if (fileName == null || !fileName.contains(".")) {
            return "";
        }

        return fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    }
}