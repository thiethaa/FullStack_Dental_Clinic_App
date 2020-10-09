package com.thiethaa.dental_clinic_config_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
@EnableConfigServer
public class DentalClinicConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DentalClinicConfigServerApplication.class, args);
	}

}
