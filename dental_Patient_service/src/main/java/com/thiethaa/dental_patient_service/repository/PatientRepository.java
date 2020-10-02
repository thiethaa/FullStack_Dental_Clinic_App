package com.thiethaa.dental_patient_service.repository;

import com.thiethaa.dental_patient_service.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient,Integer>{
    Optional<Patient> findPatientByUsername(String username);
    Optional<Patient> deletePatientByUsername(String username);
}
