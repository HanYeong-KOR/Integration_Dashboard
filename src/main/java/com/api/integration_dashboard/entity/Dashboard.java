package com.api.integration_dashboard.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "dashboard_tb")
@Getter
@NoArgsConstructor
public class Dashboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String layout;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    private Dashboard(Long id, String layout, User user) {
        this.id = id;
        this.layout = layout;
        this.user = user;
    }
}
