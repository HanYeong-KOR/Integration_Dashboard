package com.api.integration_dashboard.service;

import com.api.integration_dashboard.service.ApiDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ImageGenerationService {
    private final ApiDataService apiService;
    public final String API_KEY = "2a3de5bfabde15185ce60e086defaa59";

    public String generateImage(String prompt, String negativePrompt) {
        String apiURL = "https://api.kakaobrain.com/v2/inference/karlo/t2i";

        try {
            HttpURLConnection connection = getKakaoImageConnection(apiURL, "POST");

            String jsonInputString = "{ \"version\": \"v2.1\", \"prompt\": \"" + prompt + "\", \"negative_prompt\": \"" + negativePrompt + "\" , \"width\": 1024, \"height\" : 1024}";
            writeRequestBody(connection, jsonInputString);

            StringBuilder responseData = apiService.getHttpResponse(connection);

            if (responseData == null) {
                throw new RuntimeException("Failed to generate image");
            }

            return responseData.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private HttpURLConnection getKakaoImageConnection(String apiUrl, String method) throws IOException {
        URL url = new URL(apiUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod(method);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "KakaoAK " + API_KEY);  // Replace with your API key
        conn.setDoOutput(true);
        return conn;
    }

    private void writeRequestBody(HttpURLConnection connection, String jsonInputString) throws IOException {
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("UTF-8");
            os.write(input, 0, input.length);
        }
    }
}
