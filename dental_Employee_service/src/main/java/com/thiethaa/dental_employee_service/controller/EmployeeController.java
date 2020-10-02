package com.thiethaa.dental_employee_service.controller;

import com.thiethaa.dental_employee_service.exception.MyException;
import com.thiethaa.dental_employee_service.model.Employee;
import com.thiethaa.dental_employee_service.service.EmployeeService;
import com.thiethaa.dental_employee_service.service.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/dentalemployee")
public class EmployeeController {
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static String dt = LocalDateTime.now().format(formatter);

    @Autowired
    EmployeeService service;

    @Autowired
    Publisher publisher;

    @PostMapping(value = "/addEmployee", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addEmployee(@RequestParam("file") MultipartFile file,
                                @RequestParam("name") String name,
                                @RequestParam("position") String position,
                                @RequestParam("email") String email,
                                @RequestParam("fb") String fb,
                                @RequestParam("twitter") String twitter,
                                @RequestParam("ig") String ig,
                                @RequestParam("phone") String phone) {
        service.storeEmployeeFile(file, name, position, email, fb, twitter, ig, phone);
        String msg = "New Employee :: "+name+" has been added, "+dt;
        publisher.send(msg);
        return new ResponseEntity<>("Message send: " + msg, HttpStatus.OK);
    }

    @PutMapping("/updateEmployeeImage/{id}")
    public ResponseEntity<Employee> updateEmployeeImage(@RequestParam("file") MultipartFile file, @PathVariable String id) {
        Employee newEmployee = service.updateEmployeeFile(file, null, id);
        return new ResponseEntity<Employee>(newEmployee, new HttpHeaders(), HttpStatus.OK);
    }

    @PutMapping("/updateEmployeeInfo/{id}")
    public ResponseEntity<Employee> updateEmployeeInfo(@RequestBody Employee employee, @PathVariable("id") String id) {
        Employee newEmployee = service.updateEmployeeFile(null, employee, id);
        return new ResponseEntity<Employee>(newEmployee, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/displayEmployeeImage/{id}")
    public ResponseEntity<byte[]> displayImage(@PathVariable String id) {
        // Load file from database and show it in the browswer
        Employee employee = service.getEmployeeById(id);

        byte[] imageBytes = employee.getImage();

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
    }

    @GetMapping("/employeeList")
    public ResponseEntity<List<Employee>> getEmployeeList() {
        List<Employee> employeeList = service.getEmployeeList();
        return new ResponseEntity<List<Employee>>(employeeList, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployeeByID(@PathVariable("id") String id) {
        Employee employee = service.getEmployeeById(id);
        return new ResponseEntity<Employee>(employee, new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/removeEmployee/{id}")
    public HttpStatus deleteEmployeeById(@PathVariable("id") String id) throws MyException {
        service.deleteEmployeeById(id);
        return HttpStatus.FORBIDDEN;
    }
}
