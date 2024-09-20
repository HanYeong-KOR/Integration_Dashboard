package com.api.integration_dashboard.controller;

import com.api.integration_dashboard.entity.ImageShop;
import com.api.integration_dashboard.request.ImageShopRequest;
import com.api.integration_dashboard.service.ImageShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/imageShop")
@RequiredArgsConstructor
public class ImageShopController {
    @Autowired
    private ImageShopService imageShopService;

    @GetMapping
    public ResponseEntity<List<ImageShop>> getAllImageShops() {
        List<ImageShop> imageShopList = imageShopService.getAllImageShops();
        return ResponseEntity.ok(imageShopList);
    }

    @PostMapping("/create")
    public ResponseEntity<ImageShop> createImageShop(@RequestBody ImageShopRequest imageShopRequest) {
        ImageShop imageShop = imageShopService.createImageShop(imageShopRequest);
        return ResponseEntity.ok(imageShop);
    }

}
