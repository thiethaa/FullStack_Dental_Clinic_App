package com.dental_patients.dental_patient.controllerTest;

import com.thiethaa.dental_patient_service.controller.PatientController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
public class PatientControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    PatientController patientController;

    @Test
    void getPatientsTest() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/patientList")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    @Test
    void getPatientByUsernameTest() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get("/patient/{username}" ,"anyRegisteredUsername")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void addNewpatientTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post("/newPatient")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();
    }

    @Test
    void updatePatientTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.put("/updatePatient/{username}","anyExistUsername")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();
    }

  @Test
    void deletePatientTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.delete("/deletePatient/{username}","anyExistUsername")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
  }
}
