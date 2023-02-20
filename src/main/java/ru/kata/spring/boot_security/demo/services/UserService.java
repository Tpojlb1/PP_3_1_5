package ru.kata.spring.boot_security.demo.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;


@Service
public interface UserService extends UserDetailsService {

    List<User> getAllUsers();

    void create(User user);

    void delete(long id);

    void update(User user);

    User getById(long id);

    User findUserByEmail(String email);
}
