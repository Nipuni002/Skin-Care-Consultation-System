package backend.Service;

import java.util.List;

import backend.model.Appointment;

public interface AppointmentService {
    Appointment createAppointment(Appointment appointment);
    List<Appointment> getAllAppointments();
    Appointment getAppointmentById(Long id);
    Appointment updateAppointment(Long id, Appointment updatedAppointment);
    void deleteAppointment(Long id);
}
