package com.minarath.ems.modules.employee.service.impl;

import com.minarath.ems.modules.employee.domain.Employee;
import com.minarath.ems.modules.employee.dto.EmployeeRequestDTO;
import com.minarath.ems.modules.employee.dto.EmployeeResponseDTO;
import com.minarath.ems.modules.employee.repository.EmployeeRepository;
import com.minarath.ems.modules.employee.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.minarath.ems.modules.employee.exception.DuplicateEmailException;
import com.minarath.ems.modules.employee.exception.EmployeeNotFoundException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public EmployeeResponseDTO create(EmployeeRequestDTO requestDTO) {
        log.info("Creating employee with email: {}", requestDTO.getEmail());

        if (employeeRepository.existsByEmail(requestDTO.getEmail())) {
            throw new DuplicateEmailException("Employee already exists with email: " + requestDTO.getEmail());
        }

        Employee employee = Employee.builder()
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .email(requestDTO.getEmail())
                .phone(requestDTO.getPhone())
                .department(requestDTO.getDepartment())
                .build();

        Employee saved = employeeRepository.save(employee);
        return mapToResponseDTO(saved);
    }

    @Override
    public List<EmployeeResponseDTO> getAll() {
        log.info("Fetching all employees");

        return employeeRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public EmployeeResponseDTO getById(UUID id) {
        log.info("Fetching employee by id: {}", id);

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));

        return mapToResponseDTO(employee);
    }

    @Override
    public EmployeeResponseDTO update(UUID id, EmployeeRequestDTO requestDTO) {
        log.info("Updating employee with id: {}", id);

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));

        if (!employee.getEmail().equals(requestDTO.getEmail())
                && employeeRepository.existsByEmail(requestDTO.getEmail())) {
            throw new DuplicateEmailException("Employee already exists with email: " + requestDTO.getEmail());
        }

        employee.setFirstName(requestDTO.getFirstName());
        employee.setLastName(requestDTO.getLastName());
        employee.setEmail(requestDTO.getEmail());
        employee.setPhone(requestDTO.getPhone());
        employee.setDepartment(requestDTO.getDepartment());

        Employee updated = employeeRepository.save(employee);
        return mapToResponseDTO(updated);
    }

    @Override
    public void delete(UUID id) {
        log.info("Deleting employee with id: {}", id);

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));

        employeeRepository.delete(employee);
    }

    private EmployeeResponseDTO mapToResponseDTO(Employee employee) {
        return EmployeeResponseDTO.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .department(employee.getDepartment())
                .createdAt(employee.getCreatedAt())
                .updatedAt(employee.getUpdatedAt())
                .build();
    }
}