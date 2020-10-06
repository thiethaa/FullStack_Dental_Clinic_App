package com.thiethaa.dental_employee_service.service;

import com.thiethaa.dental_employee_service.exception.MyException;
import com.thiethaa.dental_employee_service.model.Employee;
import com.thiethaa.dental_employee_service.repository.EmployeeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class EmployeeServiceimpl implements EmployeeService {

    @Autowired
    EmployeeRepository repository;

    @Transactional
    public Employee storeEmployeeFile(MultipartFile file, String name, String position, String email, String fb, String twitter, String ig, String phone) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            Employee emp = new Employee();
            emp.setFileName(fileName);
            emp.setEmployeeName(name);
            emp.setPosition(position);
            emp.setEmail(email);
            emp.setFb(fb);
            emp.setTwitter(twitter);
            emp.setIg(ig);
            emp.setPhone(phone);
            emp.setImage(file.getBytes());
            emp.setFileType(file.getContentType());
            emp.setEmployeeID(UUID.randomUUID().toString());

            String fileDisplayUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/dentalemployee/displayEmployeeImage/")
                    .path(emp.getEmployeeID())
                    .toUriString();
            emp.setThumbnailUrl(fileDisplayUri);
            return repository.save(emp);

        } catch (Exception e) {
            e.printStackTrace(System.err);
            throw new MyException("Could not Store file " + name + " please try again!");
        }
    }

    @Transactional
    public Employee updateEmployeeFile(MultipartFile file, Employee emp, String id) {
        if (id != null) {
            Optional<Employee> employeeOption = repository.findById(id);
            if (employeeOption.isPresent()) {
                Employee existignEmployee = employeeOption.get();
                try {
                    if (file != null && emp == null ) {
                        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                        existignEmployee.setFileName(fileName);
                        existignEmployee.setImage(file.getBytes());
                        existignEmployee.setFileType(file.getContentType());

                        String fileDisplayUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                                .path("/dentalemployee/displayEmployeeImage/")
                                .path(existignEmployee.getEmployeeID())
                                .toUriString();
                        existignEmployee.setThumbnailUrl(fileDisplayUri);
                        return existignEmployee;
                    }
                    if (file == null && emp != null) {
                      //  existignEmployee.setEmployeeID(id);
                        existignEmployee.setEmployeeName(emp.getEmployeeName());
                        existignEmployee.setPosition(emp.getPosition());
                        existignEmployee.setEmail(emp.getEmail());
                        existignEmployee.setFb(emp.getFb());
                        existignEmployee.setTwitter(emp.getTwitter());
                        existignEmployee.setIg(emp.getIg());
                        existignEmployee.setPhone(emp.getPhone());
                    }

                    return  repository.save(existignEmployee);
                } catch (Exception ex) {
                    System.err.println("Error updating employee with id: " + id);
                    ex.printStackTrace(System.err);
                }
            } else {
                Employee newCreated = repository.save(emp);
                return newCreated;
            }
        }
        return null;
    }

    public List<Employee> getEmployeeList() {
        List<Employee> employeeList = repository.findAll();
        log.debug("employeeList:" + employeeList.size());
        return employeeList;
    }

    public Employee getEmployeeById(String id) throws MyException {
        Optional<Employee> emp = repository.findById(id);
        if (emp.isPresent()) {
            return emp.get();
        } else {
            throw new MyException("No Record exist");
        }
    }

    public void deleteEmployeeById(String id) throws MyException {
        Optional<Employee> emp = repository.findById(id);
        if (emp.isPresent()) {
            repository.deleteById(id);
        } else {
            throw new MyException("No Record exist");
        }
    }
}
