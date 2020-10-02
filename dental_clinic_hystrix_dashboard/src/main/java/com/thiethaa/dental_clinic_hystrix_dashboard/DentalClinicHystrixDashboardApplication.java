package com.thiethaa.dental_clinic_hystrix_dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;

@SpringBootApplication
@EnableHystrixDashboard
@EnableEurekaClient
public class DentalClinicHystrixDashboardApplication {

	public static void main(String[] args) {
		SpringApplication.run(DentalClinicHystrixDashboardApplication.class, args);
	}

}
