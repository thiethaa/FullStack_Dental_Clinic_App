package com.thiethaa.dental_treatment_service.service;

import com.thiethaa.dental_treatment_service.exception.MyException;
import com.thiethaa.dental_treatment_service.repository.TreatmentRepository;
import com.thiethaa.dental_treatment_service.model.Treatment;
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
public class TreatmentServiceImpl implements TreatmentService{

    @Autowired
    TreatmentRepository repository;

    @Transactional
    public Treatment storeTreatmentFile(MultipartFile file, String description, String title) {
        String name = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            Treatment treatment = new Treatment();
            treatment.setName(name);
            treatment.setTitle(title);
            treatment.setImage(file.getBytes());
            treatment.setDescription(description);
            treatment.setFileType(file.getContentType());
            treatment.setId(UUID.randomUUID().toString());

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/dentaltreatments/downloadFile/")
                    .path(treatment.getId())
                    .toUriString();

            treatment.setUrl(fileDownloadUri);

            String fileDisplayUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/dentaltreatments/displayFile/")
                    .path(treatment.getId())
                    .toUriString();
            treatment.setThumbnailUrl(fileDisplayUri);
            return repository.save(treatment);

        } catch (Exception e) {
            e.printStackTrace(System.err);
            throw new MyException("Could not Store file " + name + " please try again!");
        }
    }

    public Treatment updateTreatmentFile(Treatment treatment) {

        if (treatment.getId() != null) {
            Optional<Treatment> existTreatment = repository.findById(treatment.getId());
            if (existTreatment.isPresent()) {

                Treatment newTreatment = existTreatment.get();
                newTreatment.setTitle(treatment.getTitle());
                newTreatment.setDescription(treatment.getDescription());
                return repository.save(treatment);
            } else {
                Treatment newCreated = repository.save(treatment);
                return newCreated;
            }
        }
        return treatment;
    }

    public List<Treatment> getTreatmentList() {
        List<Treatment> treatmentsList = repository.findAll();
        return treatmentsList;
    }

    public Treatment getTreatmentById(String id) throws MyException {
        Optional<Treatment> treatment = repository.findById(id);
        if (treatment.isPresent()) {
            return treatment.get();
        } else {
            throw new MyException("No such a treatment exist");
        }
    }

    public Treatment getTreatmentByTitle(String title) throws MyException {
        Optional<Treatment> treatment = repository.getTreatmentByTitle(title);
        if (treatment.isPresent()) {
            return treatment.get();
        } else {
            throw new MyException("No such a treatment exist");
        }
    }


    public void deleteTreatmentById(String id) throws MyException {
        Optional<Treatment> treatment = repository.findById(id);
        if (treatment.isPresent()) {
            repository.deleteById(id);
        } else {
            throw new MyException("No such a treatment exist");
        }
    }
}
