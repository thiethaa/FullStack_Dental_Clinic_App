package com.thiethaa.dental_clinic_api_gateway.configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()

                .route(p -> p
                        .path("/dentaltreatments/**")
                        .filters(f ->
                                f.addRequestHeader("Header", "TreatmentList")
                                        .hystrix(config -> config.setName("TreatmentList")
                                                .setFallbackUri("forward:/serverFallBack"))
                        )
                        .uri("http://localhost:8020/")
                )
                .route(p -> p
                        .path("/dentalemployee/**")
                        .filters(f ->
                                f.addRequestHeader("Header", "EmployeeList")
                                        .hystrix(config -> config.setName("EmployeeList")
                                                .setFallbackUri("forward:/serverFallBack"))
                        )
                        .uri("http://localhost:8030/")
                )
                .route(p -> p
                        .path("/**")
                        .filters(f ->
                                f.addRequestHeader("Header", "PatientList")
                                        .hystrix(config -> config.setName("PatientList")
                                                .setFallbackUri("forward:/serverFallBack"))
                        )
                        .uri("http://localhost:8040/")
                )
                .build();
    }
}
