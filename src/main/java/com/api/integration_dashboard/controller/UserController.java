package com.api.integration_dashboard.controller;

import com.api.integration_dashboard.common.authority.CustomUser;
import com.api.integration_dashboard.common.response.BaseResponse;
import com.api.integration_dashboard.request.LoginRequest;
import com.api.integration_dashboard.request.UserRegisterRequest;
import com.api.integration_dashboard.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public BaseResponse<?> signup(@RequestBody @Valid UserRegisterRequest request) {
        return BaseResponse.ok(userService.signUp(request));
    }

    @PostMapping("/login")
    public BaseResponse<?> login(@RequestBody @Valid LoginRequest request) {
        return BaseResponse.ok(userService.login(request));
    }

    @GetMapping
    public BaseResponse<?> myInfo() {
        Long userId = ((CustomUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
        return BaseResponse.ok(userService.userInfo(userId));
    }
}

