package com.thiethaa.dental_employee_service.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Employee")
public class Employee {
    @Id
    private String employeeID;

    @NotEmpty
    @Column(name = "Name")
    private String employeeName;

    @NotEmpty
    @Column(name = "Position")
    private String position;

    @NotEmpty
    @Column(name = "Email")
    private String email;

    @NotEmpty
    @Column(name = "FaceBook")
    private String fb;

    @NotEmpty
    @Column(name = "Twitter")
    private String twitter;

    @NotEmpty
    @Column(name = "Instagram")
    private String ig;

    @NotEmpty
    @Column(name = "Phone")
    private String phone;

    @NotEmpty
    @Column(name = "Image")
    @Lob
    private byte[] image;

    @NotEmpty
    private String fileName;

    @NotEmpty
    private String fileType;

    @NotEmpty
    private String thumbnailUrl;
}
