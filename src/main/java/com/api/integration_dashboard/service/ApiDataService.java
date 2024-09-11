package com.api.integration_dashboard.service;

import com.api.integration_dashboard.entity.ApiData;
import com.api.integration_dashboard.entity.User;
import com.api.integration_dashboard.repository.ApiDataRepository;
import com.api.integration_dashboard.repository.UserRepository;
import com.api.integration_dashboard.request.ApiDataRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ApiDataService {
    private final ApiDataRepository apiDataRepository;
    private final UserRepository userRepository;

    public List<ApiData> getAllApiData() {
        return apiDataRepository.findAll();
    }

    public ApiData fetchAndStoreApiData(ApiDataRequest apiDataRequest) {
        User user = userRepository.findById(apiDataRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + apiDataRequest.getUserId()));

        ApiData apiData = ApiData.builder()
                .apiName(apiDataRequest.getApiName())
                .responseData(apiDataRequest.getResponseData())
                .fetchedAt(apiDataRequest.getFetchedAt())
                .user(user)
                .build();

        return apiDataRepository.save(apiData);
    }
}
