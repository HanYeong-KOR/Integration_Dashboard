package com.api.integration_dashboard.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ApiDataRequest {
    private String apiName;
    private String responseData;
    private LocalDate fetchedAt;
    private Long userId;
}
