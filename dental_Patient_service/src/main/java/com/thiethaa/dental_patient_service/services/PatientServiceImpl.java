package com.thiethaa.dental_patient_service.services;

import com.thiethaa.dental_patient_service.model.Patient;
import com.thiethaa.dental_patient_service.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientRepository repository;

//    public PatientService(PatientRepository repository) {
//        this.repository = repository;
//    }

    @Autowired
    private JavaMailSender javaMailSender;

    public String sendEmail(String username) {
        Patient p = getPatientByUsername(username);
        String date = p.getDate();
        String time = p.getTime();
        String treatment = p.getTreatment();
        String dentist = p.getDentist();
        String email = p.getEmail();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Appointment Confirmation");
        message.setText("Thank You for Choosing Our DentalCare as Your Dental HealthCare Provider, " +
                "We look Forward to Providing you with Personalized, Comprehensive DentalCare." +
                "\n\nYour Appointment for " + treatment + " With Dr. " + dentist + ", is on: " + date + ", at: " + time + "." +
                "\n Please Come 15 Minute Earlier before Your Appointment Schedule." +
                "\n\nAddress" + "\t\t\t\t:" + "\t404 Boulevard Avenue,Lilburn,GA,30056,USA" +
                "\nPhone" + "\t\t\t\t:" + "\t+1 404 776 898" +
                "\n\nPS :" + "\t- PLEASE WEAR MASK" +
                " \n\t   - Please Bring Your Insurance Card and Picture ID" +
                "\n\nWe look Forward to Meeting You, Treating You and Assisting You to get Better Smile." +
                "\nPlease Contact Us at +1 404 776 898 if you have any questions or Reschedule or Cancellation." +
                "\n\n THANK YOU.");

        javaMailSender.send(message);
        return "Notification Sent";
    }

    public List<Patient> getPatients() {
        return repository.findAll();
    }

    public Patient getPatientByUsername(String username) {
        return repository.findPatientByUsername(username).get();
    }

    public Patient addPatient(Patient newPatient) {
        Patient patient = new Patient();
        patient.setFirstName(newPatient.getFirstName());
        patient.setLastName(newPatient.getLastName());
        patient.setUsername(newPatient.getUsername());
        patient.setPassword(newPatient.getPassword());
        patient.setEmail(newPatient.getEmail());
        patient.setAddress((newPatient.getAddress()));
        patient.setDob(newPatient.getDob());
        patient.setGender(newPatient.getGender());
        patient.setPhone(newPatient.getPhone());
        patient.setTreatment(newPatient.getTreatment());
        patient.setDentist(newPatient.getDentist());
        patient.setDate(newPatient.getDate());
        patient.setTime(newPatient.getTime());
        patient.setLastTreatment("no record available");
        patient.setLastDentist("no Record available");
        patient.setLastVisit("no Recors available");
        patient.setOdontogram("no Record available");
        patient.setUnCompromised("no Record available");
        patient.setNote("no Record available");
        patient.setStatus(newPatient.getTreatment() + " by Operator: " + newPatient.getDentist() + " on: " + newPatient.getDate());
        return repository.save(patient);
    }

    public Patient updatePatient(String username, Patient newPatient) {
        Optional<Patient> exist = repository.findPatientByUsername(username);
        Patient patient = exist.get();
        String lastDentist = patient.getDentist();
        String lastTreatment = patient.getTreatment();
        String lastVisit = patient.getDate();

        if (newPatient.getFirstName() != null) {
            patient.setFirstName(newPatient.getFirstName());
        } else {
            patient.setFirstName(patient.getFirstName());
        }

        if (newPatient.getLastName() != null) {
            patient.setLastName(newPatient.getLastName());
        } else {
            patient.setLastName(patient.getLastName());
        }

        if (newPatient.getUsername() != null) {
            patient.setUsername(newPatient.getUsername());
        } else {
            patient.setUsername(patient.getUsername());
        }

        if (newPatient.getPassword() != null) {
            patient.setPassword(newPatient.getPassword());
        } else {
            patient.setPassword(patient.getPassword());
        }

        if (newPatient.getEmail() != null) {
            patient.setEmail(newPatient.getEmail());
        } else {
            patient.setEmail(patient.getEmail());
        }

        if (newPatient.getDob() != null) {
            patient.setDob(newPatient.getDob());
        } else {
            patient.setDob(patient.getDob());
        }

        if (newPatient.getGender() != null) {
            patient.setGender(newPatient.getGender());
        } else {
            patient.setGender(patient.getGender());
        }

        if (newPatient.getPhone() != null) {
            patient.setPhone(newPatient.getPhone());
        } else {
            patient.setPhone(patient.getPhone());
        }

        if (newPatient.getAddress() != null) {
            patient.setAddress(newPatient.getAddress());
        } else {
            patient.setAddress(patient.getAddress());
        }
        if (newPatient.getTreatment() != null) {
            patient.setTreatment(newPatient.getTreatment());
        } else {
            patient.setTreatment(patient.getTreatment());
        }

        if (newPatient.getDentist() != null) {
            patient.setDentist(newPatient.getDentist());
        } else {
            patient.setDentist(patient.getDentist());
        }

        if (newPatient.getDate() != null) {
            patient.setDate(newPatient.getDate());
        } else {
            patient.setDate(patient.getDate());
        }

        if (newPatient.getTime() != null) {
            patient.setTime(newPatient.getTime());
        } else {
            patient.setTime(patient.getTime());
        }

        if (newPatient.getLastDentist() == null) {
            patient.setLastDentist(lastDentist);
        } else {
            patient.setLastDentist(newPatient.getLastDentist());
        }

        if (newPatient.getLastTreatment() == null) {
            patient.setLastTreatment(lastTreatment);
        } else {
            patient.setLastTreatment(newPatient.getLastTreatment());
        }

        if (newPatient.getLastVisit() == null) {
            patient.setLastVisit(lastVisit);
        } else {
            patient.setLastVisit(newPatient.getLastVisit());
        }

        if (newPatient.getOdontogram() == null) {
            patient.setOdontogram(patient.getOdontogram());
        } else {
            patient.setOdontogram(newPatient.getOdontogram());
        }

        if (newPatient.getUnCompromised() == null) {
            patient.setUnCompromised(patient.getUnCompromised());
        } else {
            patient.setUnCompromised(newPatient.getUnCompromised());
        }

        if (newPatient.getNote() == null) {
            patient.setNote(patient.getNote());
        } else {
            patient.setNote(newPatient.getNote());
        }

        patient.setStatus("Last treatment: " + patient.getLastTreatment() + " by Operator: " + patient.getLastDentist() + " on:" + patient.getLastVisit() +
                "|| New Appointment Scheduled :" + newPatient.getTreatment() + " by Operator: " + newPatient.getDentist() + " on: " + newPatient.getDate());

        return repository.save(patient);
    }

    public void deletePatient(String username) {
        Patient p = repository.findPatientByUsername(username).get();
        repository.delete(p);
    }
}
