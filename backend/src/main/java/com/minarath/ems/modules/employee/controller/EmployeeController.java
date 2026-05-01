package com.minarath.ems.modules.employee.controller;

import com.minarath.ems.core.common.response.ApiResponse;
import com.minarath.ems.modules.employee.dto.EmployeeRequestDTO;
import com.minarath.ems.modules.employee.dto.EmployeeResponseDTO;
import com.minarath.ems.modules.employee.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> create(
            @Valid @RequestBody EmployeeRequestDTO requestDTO
    ) {
        EmployeeResponseDTO response = employeeService.create(requestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.<EmployeeResponseDTO>builder()
                        .success(true)
                        .message("Employee created successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EmployeeResponseDTO>>> getAll() {
        List<EmployeeResponseDTO> response = employeeService.getAll();

        return ResponseEntity.ok(
                ApiResponse.<List<EmployeeResponseDTO>>builder()
                        .success(true)
                        .message("Employees fetched successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> getById(@PathVariable UUID id) {
        EmployeeResponseDTO response = employeeService.getById(id);

        return ResponseEntity.ok(
                ApiResponse.<EmployeeResponseDTO>builder()
                        .success(true)
                        .message("Employee fetched successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> update(
            @PathVariable UUID id,
            @Valid @RequestBody EmployeeRequestDTO requestDTO
    ) {
        EmployeeResponseDTO response = employeeService.update(id, requestDTO);

        return ResponseEntity.ok(
                ApiResponse.<EmployeeResponseDTO>builder()
                        .success(true)
                        .message("Employee updated successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        employeeService.delete(id);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Employee deleted successfully")
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
}