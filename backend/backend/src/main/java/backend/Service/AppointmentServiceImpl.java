package backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.exception.AppointmentNotFoundException;
import backend.model.Appointment;
import backend.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    @Override
    public Appointment createAppointment(Appointment appointment) {
        return repository.save(appointment);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return repository.findAll();
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found with id: " + id));
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment updatedAppointment) {
        Appointment existingAppointment = repository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found with id: " + id));

        existingAppointment.setDoctorname(updatedAppointment.getDoctorname());
        existingAppointment.setName(updatedAppointment.getName());
        existingAppointment.setAppointmentDate(updatedAppointment.getAppointmentDate());

        return repository.save(existingAppointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        Appointment existingAppointment = repository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found with id: " + id));
        repository.delete(existingAppointment);
    }
}
