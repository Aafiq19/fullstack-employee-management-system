package com.minarath.ems.modules.employee.controller;

import com.minarath.ems.modules.employee.dto.EmployeeRequestDTO;
import com.minarath.ems.modules.employee.dto.EmployeeResponseDTO;
import com.minarath.ems.modules.employee.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> create(@Valid @RequestBody EmployeeRequestDTO requestDTO) {
        EmployeeResponseDTO response = employeeService.create(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAll() {
        return ResponseEntity.ok(employeeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(employeeService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody EmployeeRequestDTO requestDTO
    ) {
        return ResponseEntity.ok(employeeService.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}