package com.dentalcare.dentaltreatment_service.controllerTest;

import com.thiethaa.dental_treatment_service.service.TreatmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
public class TreatmentControllerTest {

    private final String baseURL ="/dentaltreatments";
    @Autowired
    MockMvc mockMvc;

    @MockBean
    TreatmentService treatmentService;

    @Test
    void getTreatmentListTest() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get(baseURL+ "/treatmentList")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getTreatmentByIdTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get(baseURL+"/treatmentbyid/{id}", "anyTreatmentID")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getTreatmentByTitleTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get(baseURL+"/treatment/{title}", "anyTreatmentTitle")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void uploadTreatmentTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post(baseURL+"/uploadTreatment", "anyTreatmentID")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();
    }

    @Test
    void updateTreatmentTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.put(baseURL+"/update", "anyTreatmentID")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();
    }

    @Test
    void deleteTreatmentByIdTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.delete(baseURL+"/remove/{id}", "anyTreatmentID"))
                .andExpect(status().isOk());
    }
}
