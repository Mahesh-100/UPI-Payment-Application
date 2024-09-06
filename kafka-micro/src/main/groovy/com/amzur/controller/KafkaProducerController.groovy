package com.amzur.controller

import com.amzur.service.KafkaProducerService
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Post
import jakarta.inject.Inject

@Controller("/produce")
class KafkaProducerController {

   @Inject
   KafkaProducerService kafkaProducerService

    @Post
    HttpResponse produce(String topic, String message) {
        kafkaProducerService.send(topic, message)
        return HttpResponse.ok("Message sent to Kafka")
    }
}
