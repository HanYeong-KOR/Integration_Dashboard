package com.api.integration_dashboard.repository;

import com.api.integration_dashboard.entity.Dashboard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DashboardRepository extends JpaRepository<Dashboard, Long> {
    Optional<Dashboard> findByUserId(Long userId);
}