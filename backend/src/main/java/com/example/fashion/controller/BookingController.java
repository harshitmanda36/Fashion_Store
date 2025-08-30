package com.example.fashion.controller;

import com.example.fashion.model.Booking;
import com.example.fashion.repository.BookingRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public static class BookingRequest {
        @NotBlank public String customerName;
        @Email public String email;
        public String productId;
        @NotNull public LocalDateTime appointmentAt;
        public String note;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookingRequest req) {
        Booking b = new Booking(req.customerName, req.email, req.productId, req.appointmentAt, req.note);
        return ResponseEntity.ok(bookingRepository.save(b));
    }
}
