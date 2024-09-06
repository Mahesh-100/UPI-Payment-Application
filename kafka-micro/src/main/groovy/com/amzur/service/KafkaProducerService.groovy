package com.amzur.service

import jakarta.inject.Singleton
import org.apache.kafka.clients.producer.KafkaProducer
import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.clients.producer.ProducerConfig
import org.apache.kafka.common.serialization.StringSerializer
@Singleton
class KafkaProducerService {

    private KafkaProducer<String, String> producer

    KafkaProducerService() {
        Properties props = new Properties()
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092")
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName())
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName())
        producer = new KafkaProducer<>(props)
    }

    void send(String topic, String message) {
        producer.send(new ProducerRecord<>(topic, message))
    }

    void close() {
        producer.close()
    }
}
