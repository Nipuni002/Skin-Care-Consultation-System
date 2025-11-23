package backend.controller;

import backend.exception.AppointmentNotFoundException;
import backend.model.Appointment;
import backend.repository.AppointmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000") // Allow React frontend to access backend
@RequestMapping("/appointments") // Base path for all endpoints in this controller
public class AppointmentController {

    @Autowired
    private AppointmentRepository repository;

    // CREATE: Add new appointment
    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return repository.save(appointment);
    }

    // READ: Get all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    // READ: Get appointment by ID
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found with id: " + id));
    }

    // UPDATE: Update appointment by ID
    @PutMapping("/{id}")
    public Appointment updateAppointment(@PathVariable Long id, @RequestBody Appointment updatedAppointment) {
        Appointment existingAppointment = repository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found with id: " + id));

        existingAppointment.setDoctorname(updatedAppointment.getDoctorname());
        existingAppointment.setName(updatedAppointment.getName());
        existingAppointment.setAppointmentDate(updatedAppointment.getAppointmentDate());


        return repository.save(existingAppointment);
    }

    // DELETE: Delete appointment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        Appointment existingAppointment = repository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found with id: " + id));

        repository.delete(existingAppointment);
        return ResponseEntity.ok("Appointment deleted successfully.");
    }
}
