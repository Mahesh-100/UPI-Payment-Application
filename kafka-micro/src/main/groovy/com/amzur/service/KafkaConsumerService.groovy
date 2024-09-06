package com.amzur.service

import io.micronaut.configuration.kafka.annotation.KafkaListener
import io.micronaut.configuration.kafka.annotation.Topic
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@KafkaListener(groupId = "payment-logging-group")
class KafkaConsumerService {

    private static final Logger LOG = LoggerFactory.getLogger(KafkaConsumerService.class)

    @Topic("payment-topic")
    void receive(String message) {
        LOG.info("Consumed message: {}", message)
        println "Consumed message: ${message}"
    }
}
