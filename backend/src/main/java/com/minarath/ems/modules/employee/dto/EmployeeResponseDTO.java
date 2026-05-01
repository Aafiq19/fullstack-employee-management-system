package com.minarath.ems.modules.employee.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class EmployeeResponseDTO {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String department;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}