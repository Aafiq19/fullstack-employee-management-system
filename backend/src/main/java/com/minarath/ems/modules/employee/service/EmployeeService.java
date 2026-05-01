package com.minarath.ems.modules.employee.service;

import com.minarath.ems.modules.employee.dto.EmployeeRequestDTO;
import com.minarath.ems.modules.employee.dto.EmployeeResponseDTO;

import java.util.List;
import java.util.UUID;

public interface EmployeeService {
    EmployeeResponseDTO create(EmployeeRequestDTO requestDTO);
    List<EmployeeResponseDTO> getAll();
    EmployeeResponseDTO getById(UUID id);
    EmployeeResponseDTO update(UUID id, EmployeeRequestDTO requestDTO);
    void delete(UUID id);
}