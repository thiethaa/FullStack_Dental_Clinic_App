package com.thiethaa.dental_employee_service.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

@Service
public class Subscriber {
    Logger log = LoggerFactory.getLogger(Subscriber.class);

    @JmsListener(destination ="myTopic")
    public void receiveMsg(String msg) {
        log.info("Received Message: "+ msg);
    }
}