package backend.controller;

import backend.model.AdminModel;
import backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/admin/signup")
    public ResponseEntity<String> adminSignup(@RequestBody AdminModel admin) {
        Optional<AdminModel> existingAdmin = adminRepository.findByEmail(admin.getEmail());

        if (existingAdmin.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists.");
        }

        adminRepository.save(admin);
        return ResponseEntity.ok("Admin registered successfully.");
    }

    @PostMapping("/admin/login")
    public ResponseEntity<String> adminLogin(@RequestBody AdminModel admin) {
        Optional<AdminModel> existingAdmin = adminRepository.findByEmailAndPassword(admin.getEmail(), admin.getPassword());

        if (existingAdmin.isPresent()) {
            return ResponseEntity.ok("Login successful.");
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password.");
        }
    }
}
