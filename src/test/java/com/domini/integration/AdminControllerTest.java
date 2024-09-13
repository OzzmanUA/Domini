package com.domini.integration;

import com.domini.RestApiDominiApplication;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = RestApiDominiApplication.class)
@AutoConfigureMockMvc
public class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testAddCategoryWithImage() throws Exception {
        Path imagePath = Path.of("C:\\Users\\ozzma\\OneDrive\\Pictures\\category.png");
        MockMultipartFile imageFile = new MockMultipartFile("file", "image.jpg",
                MediaType.IMAGE_JPEG_VALUE, Files.readAllBytes(imagePath));

        mockMvc.perform(multipart("/admin/categories")
                        .file(imageFile)
                        .param("name", "Test Category"))
                .andExpect(status().isOk());
    }
}
