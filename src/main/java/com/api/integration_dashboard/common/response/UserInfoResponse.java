package com.api.integration_dashboard.common.response;

import com.api.integration_dashboard.entity.User;

public class UserInfoResponse {
    private String username;
    private String nickname;

    public UserInfoResponse(User user) {
        this.username    = user.getUsername();
        this.nickname    = user.getNickname();
    }
}