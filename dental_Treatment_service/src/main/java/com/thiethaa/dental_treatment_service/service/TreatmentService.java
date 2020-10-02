package com.thiethaa.dental_treatment_service.service;

import com.thiethaa.dental_treatment_service.exception.MyException;
import com.thiethaa.dental_treatment_service.model.Treatment;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TreatmentService {
    Treatment storeTreatmentFile(MultipartFile file, String description, String title);

    Treatment updateTreatmentFile(Treatment treatment);

    List<Treatment> getTreatmentList();

    Treatment getTreatmentById(String id) throws MyException;

    Treatment getTreatmentByTitle(String title) throws MyException;

    void deleteTreatmentById(String id) throws MyException;


}
