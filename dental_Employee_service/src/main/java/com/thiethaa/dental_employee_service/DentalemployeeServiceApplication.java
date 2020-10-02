package com.thiethaa.dental_employee_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class DentalemployeeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DentalemployeeServiceApplication.class, args);
	}

}
