package com.minarath.ems.modules.employee.repository;

import com.minarath.ems.modules.employee.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {
    Optional<Employee> findByEmail(String email);
    boolean existsByEmail(String email);
}