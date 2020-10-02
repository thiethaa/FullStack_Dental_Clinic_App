package com.thiethaa.dental_treatment_service.repository;

import com.thiethaa.dental_treatment_service.model.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, String> {
    Optional<Treatment> getTreatmentByTitle(String title);
}
