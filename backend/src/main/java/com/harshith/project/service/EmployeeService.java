package com.harshith.project.service;

import com.harshith.project.model.Employee;
import com.harshith.project.repository.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public ResponseEntity<List<Employee>> getEmployee() {

        List<Employee> employees =  employeeRepository.findAll();
        if (employees.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(employees, HttpStatus.OK);
        }
    }

    public void addEmployee(Employee employee) {
        Optional<Employee> employeeOptional = employeeRepository.findEmployeeByEmail(employee.getEmail());
        if(employeeOptional.isPresent()) {
            throw new IllegalStateException("Email Taken Already");
        }
        employeeRepository.save(employee);
    }

    public ResponseEntity<String> deleteEmployee(Integer employeeId) {
        boolean exists = employeeRepository.existsById(employeeId);
        if(!exists) {
            throw new IllegalStateException("Employee with id " + employeeId + " does not exist.");
        }
        employeeRepository.deleteById(employeeId);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Employee with id " + employeeId + " has been successfully deleted.");
    }

    @Transactional
    public void updateEmployee(Integer employeeId, String role, String email) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalStateException(
                        "Employee with id " + employeeId + " does not exist."
                ));

        if(role!=null && !role.isEmpty() && !Objects.equals(employee.getRole(), role)) {
            employee.setRole(role);
        }

        if(email!=null && !email.isEmpty() && !Objects.equals(employee.getEmail(), email)) {
            Optional<Employee> employeeOptional = employeeRepository.findEmployeeByEmail(email);
            if(employeeOptional.isPresent()) {
                throw new IllegalStateException("Email already taken.");
            }
            employee.setEmail(email);
        }

    }
}
