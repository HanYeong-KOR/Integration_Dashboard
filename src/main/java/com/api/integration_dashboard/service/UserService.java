package com.api.integration_dashboard.service;

import com.api.integration_dashboard.common.authority.JwtTokenProvider;
import com.api.integration_dashboard.common.authority.TokenInfo;
import com.api.integration_dashboard.common.exception.InvalidInputException;
import com.api.integration_dashboard.common.response.UserInfoResponse;
import com.api.integration_dashboard.common.status.Role;
import com.api.integration_dashboard.entity.User;
import com.api.integration_dashboard.entity.UserRole;
import com.api.integration_dashboard.repository.UserRepository;
import com.api.integration_dashboard.repository.UserRoleRepository;
import com.api.integration_dashboard.request.LoginRequest;
import com.api.integration_dashboard.request.UserRegisterRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 회원 가입
     */
    public String signUp(UserRegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new InvalidInputException("loginId", "중복된 ID 입니다.");
        }

        User user = request.toEntity(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        UserRole userRole = UserRole.builder()
                .role(Role.USER)
                .user(user)
                .build();
        userRoleRepository.save(userRole);

        return "가입되었습니다.";
    }

    /**
     * 로그인
     */
    public TokenInfo login(LoginRequest request) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        return jwtTokenProvider.createToken(authentication);
    }

    /**
     * 정보조회
     */
    public UserInfoResponse userInfo(Long userId) {
        User findMember = userRepository.findById(userId).orElseThrow(() ->
                new InvalidInputException("token", "회원 정보가 존재하지 않습니다."));
        return new UserInfoResponse(findMember);
    }
}
