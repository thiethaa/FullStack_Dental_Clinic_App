package com.thiethaa.dental_patient_service.services;

import com.thiethaa.dental_patient_service.model.Patient;

import java.util.List;

public interface PatientService {
    String sendEmail(String username);

    List<Patient> getPatients();

    Patient getPatientByUsername(String username);

    Patient addPatient(Patient newPatient);

    Patient updatePatient(String username, Patient newPatient);

    void deletePatient(String username);
}
