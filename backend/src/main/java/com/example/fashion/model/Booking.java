package com.example.fashion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "bookings")
public class Booking {
    @Id
    private String id;
    private String customerName;
    private String email;
    private String productId;
    private LocalDateTime appointmentAt;
    private String note;

    public Booking() {}

    public Booking(String customerName, String email, String productId, LocalDateTime appointmentAt, String note) {
        this.customerName = customerName;
        this.email = email;
        this.productId = productId;
        this.appointmentAt = appointmentAt;
        this.note = note;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public LocalDateTime getAppointmentAt() { return appointmentAt; }
    public void setAppointmentAt(LocalDateTime appointmentAt) { this.appointmentAt = appointmentAt; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
