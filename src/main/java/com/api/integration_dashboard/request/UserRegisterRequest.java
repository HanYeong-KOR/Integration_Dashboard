package com.api.integration_dashboard.request;


import com.api.integration_dashboard.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRegisterRequest {
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9_]{5,20}",
            message = "영문, 숫자, _만을 사용하세요")
    private String username;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@$%^&*])[a-zA-Z0-9!@$%^&*]{8,20}",
            message = "영문, 숫자, 특수문자를 포함한 10~20자리로 입력해주세요")
    private String password;

    @NotBlank
    private String nickname;

    private LocalDate createdDate;

    public User toEntity(String encode) {
        return User.builder()
                .username(this.getUsername())
                .password(encode)
                .nickname(this.getNickname())
                .build();
    }
}
