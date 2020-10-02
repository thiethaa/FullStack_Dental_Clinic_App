package com.thiethaa.dental_patient_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class DentalPatientApplication {

	public static void main(String[] args) {
		SpringApplication.run(DentalPatientApplication.class, args);
	}

}
