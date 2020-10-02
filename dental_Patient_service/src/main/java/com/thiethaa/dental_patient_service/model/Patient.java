package com.thiethaa.dental_patient_service.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private String dob;
    private String gender;
    private String phone;
    private String address;
    private String treatment;
    private String dentist;
    private String date;
    private String time;
    private String lastTreatment;
    private String lastDentist;
    private String lastVisit;
    private String status;

    private String odontogram;
    private String unCompromised;
    private String note;

}
