package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.Service.AppointmentService;
import backend.model.Appointment;

@RestController
@CrossOrigin("http://localhost:3000") // Allow React frontend to access backend
@RequestMapping("/appointments") // Base path for all endpoints in this controller
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // CREATE: Add new appointment
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.createAppointment(appointment);
    }

    // READ: Get all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    // READ: Get appointment by ID
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    // UPDATE: Update appointment by ID
    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment updatedAppointment) {
        return appointmentService.updateAppointment(id, updatedAppointment);
    }

    // DELETE: Delete appointment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Appointment deleted successfully.");
    }
}
