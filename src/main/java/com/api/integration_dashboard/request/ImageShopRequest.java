package com.api.integration_dashboard.request;

import com.api.integration_dashboard.entity.User;
import lombok.Data;
@Data
public class ImageShopRequest {
    private String title;
    private String imageUrl;
    private Integer price;
    private String description;
    private User user;
}
