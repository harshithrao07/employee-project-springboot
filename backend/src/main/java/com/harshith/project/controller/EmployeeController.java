package com.harshith.project.controller;

import com.harshith.project.service.EmployeeService;
import com.harshith.project.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getEmployee() {
        return employeeService.getEmployee();
    }

    @PostMapping
    public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }

    @DeleteMapping(path = "{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("employeeId") Integer employeeId) {
        return employeeService.deleteEmployee(employeeId);
    }

    @PutMapping(path = "{employeeId}")
    public ResponseEntity<String> updateEmployee(
            @PathVariable("employeeId") Integer employeeId,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String role
    ) {
        return employeeService.updateEmployee(employeeId, role, email);
    }
}
