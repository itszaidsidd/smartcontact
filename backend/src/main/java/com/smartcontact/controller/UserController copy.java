// package com.smartcontact.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.smartcontact.entity.User;
// import com.smartcontact.service.UserService;


// @RestController
// @RequestMapping("/user")
// @CrossOrigin(origins = "*")
// public class UserController {

//     @Autowired 
//     private UserService userService;

//     @PostMapping
//     public ResponseEntity<?> addUser(@RequestBody User user){

//         try {
//             user.setRole("ROLE_USER");
//             user.setEnabled(true);
//             User savedUser = userService.addUser(user);
//             return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server par koi dikkat aa gayi hai: " + e.getMessage());
//         }
//     }
// }
