package com.smartcontact.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartcontact.entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{
    Optional<User> findByEmail(String email);

}
