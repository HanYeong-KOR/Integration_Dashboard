package com.api.integration_dashboard.service;

import com.api.integration_dashboard.entity.ApiData;
import com.api.integration_dashboard.entity.User;
import com.api.integration_dashboard.repository.ApiDataRepository;
import com.api.integration_dashboard.repository.UserRepository;
import com.api.integration_dashboard.request.ApiDataRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApiDataService {

    @Autowired
    private ApiDataRepository apiDataRepository;

    @Autowired
    private UserRepository userRepository;

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
