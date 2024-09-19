package com.api.integration_dashboard.controller;

import com.api.integration_dashboard.entity.ApiData;
import com.api.integration_dashboard.service.ApiDataService;
import com.api.integration_dashboard.service.ImageGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiDataController {
    private final ApiDataService apiService;
    private final ImageGenerationService imageGenerationService;

    @GetMapping("/fetch")
    public ResponseEntity<List<ApiData>> fetchApiData() {
        List<ApiData> apiDatas = apiService.getAllApiData();
        return ResponseEntity.ok(apiDatas);
    }

    @GetMapping("/joke")
    public ResponseEntity<StringBuilder> getJokeApiData() {
        StringBuilder apiData= apiService.fetchJokeData();
        return ResponseEntity.ok(apiData);
    }

    @PostMapping("/naverNews")
    public ResponseEntity<StringBuilder> getNaverNews(@RequestBody String search) {
        StringBuilder apiData = apiService.fetchNaverNews(search);
        return ResponseEntity.ok(apiData);
    }

    @PostMapping("/karlo")
    public ResponseEntity<String> getKarlo(@RequestBody Map<String, String> requestData) {
        String prompt = requestData.get("prompt");
        String negativePrompt = requestData.get("negative_prompt");
        String apiResponse = imageGenerationService.generateImage(prompt, negativePrompt);

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/nasa")
    public ResponseEntity<StringBuilder> getNasaImage(@RequestBody String search) {
        StringBuilder apiData= apiService.getNasaImageData(search);
        return ResponseEntity.ok(apiData);
    }
}

