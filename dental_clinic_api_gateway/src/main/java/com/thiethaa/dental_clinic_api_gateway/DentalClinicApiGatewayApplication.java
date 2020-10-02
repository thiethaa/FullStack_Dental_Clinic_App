package com.thiethaa.dental_clinic_api_gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;

@SpringBootApplication
@EnableEurekaClient
@EnableHystrix
public class DentalClinicApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(DentalClinicApiGatewayApplication.class, args);
	}

}
