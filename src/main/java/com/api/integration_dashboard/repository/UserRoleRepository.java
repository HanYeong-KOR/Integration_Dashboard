package com.api.integration_dashboard.repository;

import com.api.integration_dashboard.entity.User;
import com.api.integration_dashboard.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.management.relation.Role;
import java.util.List;
import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    List<UserRole> findByUser(User user);
    Optional<UserRole> findByUserAndRole(User user, Role role);
}
