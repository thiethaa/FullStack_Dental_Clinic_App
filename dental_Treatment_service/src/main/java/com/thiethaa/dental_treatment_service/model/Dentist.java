package com.thiethaa.dental_treatment_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dentist {
    private String employeeID;
    private String title;
    private String position;
    private String employeeName;
    private String phone;
    private String email;
}
