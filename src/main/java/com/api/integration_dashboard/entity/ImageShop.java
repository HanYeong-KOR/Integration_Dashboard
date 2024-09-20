package com.api.integration_dashboard.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "imageShop_tb")
@Getter
@NoArgsConstructor
public class ImageShop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shop_id;

    @Column(nullable = false, length = 30)
    private String title;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private Integer price;

    @Lob
    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDate createdDate;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_owner_id", nullable = true)
//    private User user;


    @Builder
    private ImageShop(Long shop_id, String title, String imageUrl, Integer price, String description) {
        this.shop_id = shop_id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.createdDate = LocalDate.now();
//        this.user = user;
    }
}
