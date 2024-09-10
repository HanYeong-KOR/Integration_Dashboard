package com.api.integration_dashboard.repository;

import com.api.integration_dashboard.entity.ApiData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiDataRepository extends JpaRepository<ApiData, Long> {
    List<ApiData> findByUserId(Long userId);
}
