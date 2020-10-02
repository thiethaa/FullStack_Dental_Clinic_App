package com.thiethaa.dental_treatment_service.controller;

import com.thiethaa.dental_treatment_service.exception.MyException;
import com.thiethaa.dental_treatment_service.model.Dentist;
import com.thiethaa.dental_treatment_service.model.Treatment;
import com.thiethaa.dental_treatment_service.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/dentaltreatments")
public class TreatmentController {

    @Autowired
    TreatmentService service;

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/dentistbytreatment/{title}")
    public Dentist[] getDentistByTreatment(@PathVariable("title") String title) {
        Treatment dentalTreatment = service.getTreatmentByTitle(title);

        String url = "http://localhost:8030/dentalemployee/employeeList";
        ResponseEntity<Dentist[]> response = restTemplate.getForEntity(url, Dentist[].class);

        Dentist[] dentists = null;
        System.out.println("response code: " + response.getStatusCode().value());
        if (response != null && response.getStatusCode().is2xxSuccessful() && response.hasBody() && response.getBody().length > 0) {
          dentists = response.getBody();
            for (Dentist d : dentists) {
                d.getEmployeeID();
                d.getEmployeeName();
                d.setTitle(dentalTreatment.getTitle());
                d.getEmail();
                d.getPhone();
            }
        }
        return dentists;
    }

    @GetMapping("/treatmentList")
    public ResponseEntity<List<Treatment>> getTreatmentList() {
        List<Treatment> dentalTreatmentList = service.getTreatmentList();
        return new ResponseEntity<List<Treatment>>(dentalTreatmentList, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/treatmentbyid/{id}")
    public Treatment getTreatmentById(@PathVariable("id") String id) {
        Treatment treatment = service.getTreatmentById(id);
        return treatment;
    }

    @GetMapping("/treatment/{title}")
    public Treatment getTreatmentByTitle(@PathVariable("title") String title) {
        Treatment treatment = service.getTreatmentByTitle(title);
        return treatment;
    }

    @PostMapping(value = "/uploadTreatment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Treatment uploadTreatmentFile(@RequestParam("file") MultipartFile file,
                                         @RequestParam("description") String description,
                                         @RequestParam("title") String title) {
        Treatment treatment = service.storeTreatmentFile(file, description, title);
        return treatment;
    }

    @PutMapping("/update")
    public ResponseEntity<Treatment> updateTreatment(@RequestBody Treatment treatment) {
        Treatment newTreatment = service.updateTreatmentFile(treatment);
        return new ResponseEntity<Treatment>(newTreatment, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/downloadFile/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String id, HttpServletRequest req, HttpServletResponse response) {
        // Load file from database
        Treatment treatment = service.getTreatmentById(id);
        ResponseEntity responseEntity = null;
        try {
            responseEntity = ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(treatment.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + treatment.getName() + "\"")
                    .body(new ByteArrayResource(treatment.getImage()));
        } catch (Exception ex) {
            ex.printStackTrace(System.err);
        }
        return responseEntity;
    }

    @GetMapping("/displayFile/{id}")
    public ResponseEntity<byte[]> displayImage(@PathVariable String id) {
        // Load file from database and show it in the browswer
        Treatment treatment = service.getTreatmentById(id);

        byte[] imageBytes = treatment.getImage();

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
    }

    @DeleteMapping("/remove/{id}")
    public HttpStatus deleteTreatmentById(@PathVariable("id") String id) throws MyException {
        service.deleteTreatmentById(id);
        return HttpStatus.FORBIDDEN;
    }
}
