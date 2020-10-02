package com.thiethaa.dental_employee_service.service;

import com.thiethaa.dental_employee_service.exception.MyException;
import com.thiethaa.dental_employee_service.model.Employee;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EmployeeService {
    Employee storeEmployeeFile(MultipartFile file, String name, String position, String email, String fb, String twitter, String ig, String phone);

    Employee updateEmployeeFile(MultipartFile file, Employee emp, String id);

    List<Employee> getEmployeeList();

    Employee getEmployeeById(String id) throws MyException;

    void deleteEmployeeById(String id) throws MyException;
}
