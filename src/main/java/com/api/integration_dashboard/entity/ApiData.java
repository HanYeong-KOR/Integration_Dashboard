package com.api.integration_dashboard.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "api_data_tb")
@Getter
@NoArgsConstructor
public class ApiData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String apiName;
    private String responseData;
    private LocalDate fetchedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    private ApiData(Long id, String apiName, String responseData, LocalDate fetchedAt, User user) {
        this.id = id;
        this.apiName = apiName;
        this.responseData = responseData;
        this.fetchedAt = fetchedAt;
        this.user = user;
    }
}

