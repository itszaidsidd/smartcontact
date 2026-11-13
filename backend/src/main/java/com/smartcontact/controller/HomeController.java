package com.smartcontact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.smartcontact.entity.User;
import com.smartcontact.repository.UserRepository;
import com.smartcontact.service.UserService;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "*")
public class HomeController {
    
    @Autowired
    private AuthenticationManager authenticationManager; 

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder; 

    @PostMapping("/signup")
    public ResponseEntity<?> addUser(@Valid @RequestBody User user, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            user.setRole("ROLE_USER");
            user.setEnabled(true);
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            User savedUser = userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> serverError = new HashMap<>();

            String fullErrorText = e.toString() + (e.getCause() != null ? e.getCause().toString() : "");

            if (fullErrorText.toLowerCase().contains("constraintviolation") ||
                    fullErrorText.toLowerCase().contains("duplicate")) {
                serverError.put("email", "This email is already registered!");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(serverError);
            }

            serverError.put("global", "Something went wrong on the server.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(serverError);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("message", "Login successful!");
            responseData.put("name", user.getName());
            responseData.put("email", user.getEmail());
            responseData.put("role", user.getRole()); 

            return ResponseEntity.ok(responseData);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email or password!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

}
