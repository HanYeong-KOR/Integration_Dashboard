package com.api.integration_dashboard.service;

import com.api.integration_dashboard.entity.ImageShop;
import com.api.integration_dashboard.entity.User;
import com.api.integration_dashboard.repository.ImageShopRepository;
import com.api.integration_dashboard.repository.UserRepository;
import com.api.integration_dashboard.request.ImageShopRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ImageShopService {
    private final ImageShopRepository imageShopRepository;
    private final UserRepository userRepository;

    public List<ImageShop> getAllImageShops() {
        return imageShopRepository.findAll();
    }

    public Optional<ImageShop> getImageShopById(Long id) {
        return imageShopRepository.findById(id);
    }

    @Transactional
    public ImageShop createImageShop(ImageShopRequest imageShopRequest) {
        // User 조회
        User user = userRepository.findById(imageShopRequest.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + imageShopRequest.getUser()));

        ImageShop imageShop = ImageShop.builder()
                .title(imageShopRequest.getTitle())
                .imageUrl(imageShopRequest.getImageUrl())
                .price(imageShopRequest.getPrice())
                .description(imageShopRequest.getDescription())
                .user(user)
                .build();

        return imageShopRepository.save(imageShop);
    }
}
