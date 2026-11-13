package com.smartcontact.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.smartcontact.entity.Contact;
import com.smartcontact.entity.User;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    List<Contact> findByUser(User user);
}
