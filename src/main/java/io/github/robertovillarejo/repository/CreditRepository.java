package io.github.robertovillarejo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import io.github.robertovillarejo.domain.Credit;

public interface CreditRepository extends MongoRepository<Credit, String> {

}
