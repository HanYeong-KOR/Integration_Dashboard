package com.api.integration_dashboard.service;

import com.api.integration_dashboard.common.authority.CustomUser;
import com.api.integration_dashboard.entity.User;
import com.api.integration_dashboard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        return createUserDetails(user);
    }

    private UserDetails createUserDetails(User user) {
//        List<SimpleGrantedAuthority> authorities = user.getUserRoles().stream()
//                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
//                .toList();

        List<SimpleGrantedAuthority> authorities = []

        return new CustomUser(user.getId(), user.getUsername(), user.getPassword(), authorities);
    }
}
