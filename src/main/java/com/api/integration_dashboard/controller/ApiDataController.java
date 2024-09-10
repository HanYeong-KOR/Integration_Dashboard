package com.api.integration_dashboard.controller;

import com.api.integration_dashboard.entity.ApiData;
import com.api.integration_dashboard.request.ApiDataRequest;
import com.api.integration_dashboard.service.ApiDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiDataController {

    @Autowired
    private ApiDataService apiService;

    @PostMapping("/fetch")
    public ResponseEntity<ApiData> fetchApiData(@RequestBody ApiDataRequest apiRequest) {
        ApiData apiData = apiService.fetchAndStoreApiData(apiRequest);
        return ResponseEntity.ok(apiData);
    }
}

