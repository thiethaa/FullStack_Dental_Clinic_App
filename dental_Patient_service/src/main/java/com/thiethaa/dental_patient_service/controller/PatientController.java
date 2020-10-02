package com.thiethaa.dental_patient_service.controller;

import com.thiethaa.dental_patient_service.services.PatientService;
import com.thiethaa.dental_patient_service.services.Publisher;
import com.thiethaa.dental_patient_service.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static String dt = LocalDateTime.now().format(formatter);

    @Autowired
    Publisher publisher;

    @Autowired
    PatientService service;


    @GetMapping("/sendNotification/{username}")
    public String sendEmail(@PathVariable("username")String username) {
        return service.sendEmail(username);
    }

    @RequestMapping("/sendMsg")
    public ResponseEntity<String>send(@RequestBody String msg){
        publisher.send(msg);
        return new ResponseEntity<>("Message send: " + msg, HttpStatus.OK);
    }

    @GetMapping("/patientList")
    public List<Patient> getPatients(){
        return service.getPatients();
    }

    @GetMapping("/patient/{username}")
    public Patient getPatientByUsername(@PathVariable("username") String username){
       Patient exist = service.getPatientByUsername(username);
       if(exist != null) {
           publisher.send("Message send: Patient with Username " + username + "has been found!");
       }else{
          publisher.send("Message send: Patient with Username " + username + " not found!");
       }
       return exist;
    }

    @PostMapping("/newPatient")
    public ResponseEntity<String> addNewPatient(@RequestBody Patient newPatient){
        service.addPatient(newPatient);
        String msg = "New Patient has been added, "+dt;
        publisher.send(msg);
        return new ResponseEntity<>("Message send: " + msg, HttpStatus.OK);
    }

    @PutMapping("/updatePatient/{username}")
    public ResponseEntity<String> updatePatient(@PathVariable("username") String username,@RequestBody Patient newPatient){
        service.updatePatient(username,newPatient);
        String msg ="Patient Username : "+ username +" Has been updated, Last Update: "+dt;
        publisher.send(msg);
        return new ResponseEntity<>("Message send: " + msg, HttpStatus.OK);
    }

    @DeleteMapping("/deletePatient/{username}")
    public ResponseEntity<String> deletePatient(@PathVariable("username") String username){
        service.deletePatient(username);
        String msg = "Patient Username : "+ username + " Has been deleted "+dt;
        publisher.send(msg);
        return new ResponseEntity<>("Message send: " + msg, HttpStatus.OK);
    }
}
