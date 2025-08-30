package com.example.fashion.repository;

import com.example.fashion.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookingRepository extends MongoRepository<Booking, String> { }
