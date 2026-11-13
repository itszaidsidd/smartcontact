package com.smartcontact.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartcontact.entity.User;
import com.smartcontact.repository.UserRepository;

@Service 
public class UserService {

    @Autowired 
    private UserRepository userRepository;

    public User addUser(User user){
        return userRepository.save(user);
    }

    public List<User> getAllUser(){
        List<User> users= userRepository.findAll();
        return users;
    }

}
