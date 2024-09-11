package com.api.integration_dashboard.controller;

import com.api.integration_dashboard.entity.ApiData;
import com.api.integration_dashboard.service.ApiDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiDataController {
    private final ApiDataService apiService;

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
}

