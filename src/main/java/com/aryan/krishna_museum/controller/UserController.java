package com.aryan.krishna_museum.controller;

import com.aryan.krishna_museum.model.User;
import com.aryan.krishna_museum.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {   
        this.repo = repo;
    }

    // 🔹 REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            user.setRole("USER");
            repo.save(user);
            return ResponseEntity.ok("User Registered");
        } catch (Exception e) {
            // Check if it's a duplicate email error
            if (e.getMessage().contains("Duplicate entry") || e.getMessage().contains("unique constraint")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
        }
    }

    // 🔹 LOGIN
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user, HttpSession session) {

        User u = repo.findByEmail(user.getEmail());

        if (u != null && u.getPassword().equals(user.getPassword())) {
            session.setAttribute("user", u);
            Map<String, Object> response = new HashMap<>();
            response.put("role", u.getRole());
            response.put("name", u.getName());
            response.put("email", u.getEmail());
            return ResponseEntity.ok(response);
        }

        Map<String, Object> invalid = new HashMap<>();
        invalid.put("status", "INVALID");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(invalid);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(HttpSession session) {
        User current = (User) session.getAttribute("user");
        if (current == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        current.setPassword(null);
        return ResponseEntity.ok(current);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProfile(@RequestBody User user, HttpSession session) {
        User current = (User) session.getAttribute("user");
        if (current == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UNAUTHORIZED");
        }

        user.setRole(current.getRole());
        repo.updateProfile(user, current.getEmail());
        user.setRole(current.getRole());
        session.setAttribute("user", user);

        return ResponseEntity.ok("UPDATED");
    }
}
