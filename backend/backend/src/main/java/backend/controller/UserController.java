package backend.controller;

import backend.exception.UserNotFoundException;
import backend.model.UserModel;
import backend.model.InventoryModel;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository UserRepository;

    @PostMapping("/user")
    public UserModel newUserModel(@RequestBody UserModel newUserModel) {
        return UserRepository.save(newUserModel);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserModel loginDetails) {
        UserModel user = UserRepository.findByEmail(loginDetails.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Email not found: " + loginDetails.getEmail()));

        if (user.getPassword().equals(loginDetails.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login Successful");
            response.put("id", user.getId());
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    //Display
    @GetMapping("/user")
    List<UserModel> getAllUsers() {return UserRepository.findAll();}

    @GetMapping("/user/{id}")
    UserModel getUserId(@PathVariable Long id){
        return UserRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

    }


}
