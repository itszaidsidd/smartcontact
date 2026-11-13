package com.smartcontact.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smartcontact.entity.User;
import com.smartcontact.repository.UserRepository;

@Service 
public class UserDetailServiceImp2 implements UserDetailsService{

    @Autowired 
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findByEmail(username)
        .orElseThrow(()->new UsernameNotFoundException("Username not found with email: "+username));
       
        return new CustomUserDetails2(user);
    }
    
}
