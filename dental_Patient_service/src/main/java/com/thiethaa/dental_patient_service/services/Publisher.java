package com.thiethaa.dental_patient_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class Publisher {
    @Autowired
    JmsTemplate jmsTemplate;
    @Value("myTopic")
    private String myT;

    public void send(String msg) {
        jmsTemplate.convertAndSend(myT, msg);
    }
}
