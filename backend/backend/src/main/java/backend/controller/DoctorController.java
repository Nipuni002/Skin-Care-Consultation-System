package backend.controller;

import backend.model.DoctorModel;
import backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @PostMapping("/doctor")
    public DoctorModel newDoctor(@RequestBody DoctorModel newDoctor) {
        return doctorRepository.save(newDoctor);
    }

    @PostMapping("/doctor/uploadImage")
    public String uploadDoctorImage(@RequestParam("file") MultipartFile file) {
        String folder = "src/main/uploads/";
        String imageName = file.getOriginalFilename();

        try {
            File uploadDir = new File(folder);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            file.transferTo(Paths.get(folder + imageName));
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file: " + imageName;
        }

        return imageName;
    }

    @GetMapping("/doctor")
    public List<DoctorModel> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @PutMapping("/doctor/{id}")
    public DoctorModel updateDoctor(@PathVariable Long id, @RequestBody DoctorModel updatedDoctor) {
        return doctorRepository.findById(id)
                .map(doctor -> {
                    doctor.setName(updatedDoctor.getName());
                    doctor.setExperience(updatedDoctor.getExperience());
                    doctor.setPhone(updatedDoctor.getPhone());
                    doctor.setAddress(updatedDoctor.getAddress());
                    doctor.setItemDescription(updatedDoctor.getItemDescription());

                    if (updatedDoctor.getImage() != null && !updatedDoctor.getImage().isEmpty()) {
                        doctor.setImage(updatedDoctor.getImage());
                    }

                    return doctorRepository.save(doctor);
                })
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }

    @DeleteMapping("/doctor/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new RuntimeException("Doctor not found with id: " + id);
        }
        doctorRepository.deleteById(id);
        return "Doctor with id " + id + " has been deleted successfully.";
    }
}
