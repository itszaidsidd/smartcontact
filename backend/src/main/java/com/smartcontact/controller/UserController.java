package com.smartcontact.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.smartcontact.entity.Contact;
import com.smartcontact.entity.User;
import com.smartcontact.repository.ContactRepository;
import com.smartcontact.repository.UserRepository;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Cloudinary cloudinary;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Principal principal) {
        try {
            String email = principal.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            user.setPassword(null);
            return ResponseEntity.ok(user);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Profile fetch karne me dikkat aayi"));
        }
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateUserProfile(
            @RequestParam("name") String name,
            @RequestParam(value = "about", required = false) String about,
            @RequestParam(value = "profileImage", required = false) MultipartFile file,
            Principal principal) {

        try {
            String email = principal.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            user.setName(name);
            user.setAbout(about);

           
            if (file != null && !file.isEmpty()) {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                        Map.of("folder", "smart_contact_profiles"));
                String imageUrl = uploadResult.get("secure_url").toString();
                user.setImageUrl(imageUrl);
            }

            User updatedUser = userRepository.save(user);
            updatedUser.setPassword(null);

            return ResponseEntity.ok(updatedUser);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Profile update nahi ho payi: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Add Contact API
    @PostMapping("/add-contact")
    public ResponseEntity<?> addContact(
            @RequestParam("name") String name,
            @RequestParam(value = "secondName", required = false) String secondName,
            @RequestParam(value = "work", required = false) String work,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "profileImage", required = false) MultipartFile file,
            Principal principal) {

        try {
            String userEmail = principal.getName();
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            Contact contact = new Contact();
            contact.setName(name);
            contact.setSecondName(secondName);
            contact.setWork(work);
            contact.setEmail(email);
            contact.setPhone(phone);
            contact.setDescription(description);

           

            if (file != null && !file.isEmpty()) {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                        Map.of("folder", "smart_contact_images"));
                String imageUrl = uploadResult.get("secure_url").toString();
                contact.setImage(imageUrl);
            } else {
                contact.setImage("https://placeholder.com");
            }

            contact.setUser(user);
            user.getContact().add(contact);

            userRepository.save(user); 

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("message", "Contact saved successfully!"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Contact save karne me dikkat aayi: " + e.getMessage()));
        }
    }

    // View All Contacts API
    @GetMapping("/contacts")
    public ResponseEntity<?> getContacts(Principal principal) {
        try {
            String userEmail = principal.getName();
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            List<Contact> contacts = contactRepository.findByUser(user);
            return ResponseEntity.ok(contacts);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Contacts fetch nahi ho paye"));
        }
    }

    // Single Contact Fetch API
    @GetMapping("/contact/{cid}")
    public ResponseEntity<?> getSingleContact(@PathVariable("cid") Integer cid, Principal principal) {
        try {
            String userEmail = principal.getName();
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            Contact contact = contactRepository.findById(cid)
                    .orElseThrow(() -> new RuntimeException("Contact not found"));

            if (!contact.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Unauthorized access!"));
            }

            return ResponseEntity.ok(contact);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Contact nahi mila"));
        }
    }

    // Update Contact API
    @PutMapping("/update-contact/{cid}")
    public ResponseEntity<?> updateContact(
            @PathVariable("cid") Integer cid,
            @RequestParam("name") String name,
            @RequestParam(value = "secondName", required = false) String secondName,
            @RequestParam(value = "work", required = false) String work,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "profileImage", required = false) MultipartFile file,
            Principal principal) {

        try {
            String userEmail = principal.getName();
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            Contact contact = contactRepository.findById(cid)
                    .orElseThrow(() -> new RuntimeException("Contact not found"));

            if (!contact.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Aap kisi doosre ka contact update nahi kar sakte!"));
            }

            contact.setName(name);
            contact.setSecondName(secondName);
            contact.setWork(work);
            contact.setEmail(email);
            contact.setPhone(phone);
            contact.setDescription(description);

           
            if (file != null && !file.isEmpty()) {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                        Map.of("folder", "smart_contact_images"));
                String imageUrl = uploadResult.get("secure_url").toString();
                contact.setImage(imageUrl);
            }

            contactRepository.save(contact);

            return ResponseEntity.ok(Map.of("message", "Contact updated successfully!"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Contact update nahi ho paya: " + e.getMessage()));
        }
    }

    // Delete Contact API
    @DeleteMapping("/contact/{cid}")
    public ResponseEntity<?> deleteContact(@PathVariable("cid") Integer cid, Principal principal) {
        try {
            String userEmail = principal.getName();
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            Contact contact = contactRepository.findById(cid)
                    .orElseThrow(() -> new RuntimeException("Contact not found"));

            if (!contact.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Aap kisi doosre ka contact delete nahi kar sakte!"));
            }

            user.getContact().remove(contact);
            contactRepository.delete(contact);

            return ResponseEntity.ok(Map.of("message", "Contact deleted successfully!"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Contact delete nahi ho paya"));
        }
    }

    // Change Password API
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> passwordData, Principal principal) {
        try {
            String oldPassword = passwordData.get("oldPassword");
            String newPassword = passwordData.get("newPassword");

            if (oldPassword == null || newPassword == null || newPassword.length() < 8) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "New password must be at least 8 characters long."));
            }

            String email = principal.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Old password is incorrect!"));
            }

            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);

            return ResponseEntity.ok(Map.of("message", "Password changed successfully!"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Something went wrong while changing password."));
        }
    }

}
