package com.api.integration_dashboard.repository;

import com.api.integration_dashboard.entity.ImageShop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageShopRepository extends JpaRepository<ImageShop, Long> {
    Optional<ImageShop> findByTitle(String title);
}
