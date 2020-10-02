package com.dentalcare.dentalemployee_service.controllerTest;

import com.thiethaa.dental_employee_service.controller.EmployeeController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
public class EmployeeControllerTest {

    private final String baseURL= "/dentalemployee";

    @Autowired
    MockMvc mockMvc;

    @MockBean
    EmployeeController employeeController;

    @Test
    void getEmployeeListTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get(baseURL+"/employeeList")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getEmployeeLisbyIdtTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.get(baseURL+"/employee/{id}","employeeID")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void addEmployeeTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.post(baseURL+"/addEmployee")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
    }

    @Test
    void updateEmployeeTest()throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.put(baseURL+"/updateEmployeeInfo/{id}","employeeID")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
    }

    @Test
    void deleteEmployeeTest() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders.delete(baseURL+"/removeEmployee/{id}","employeeID"))
                .andExpect(status().isOk());
    }
}
