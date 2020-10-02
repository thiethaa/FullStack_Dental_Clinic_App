package com.thiethaa.dental_clinic_api_gateway.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class GatewayController {

    @RequestMapping("/serverFallBack")
    public Mono<String> countries() {
        return Mono.just("API-Server is down. Please try again later");
    }
}
