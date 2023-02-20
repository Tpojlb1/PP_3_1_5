package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminRestController {
    private final UserService userService;
    private final RoleService roleService;
    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @PostMapping("/users")
    public ResponseEntity <User> create(@RequestBody User user){
        userService.create(user);
        return new ResponseEntity<>(user, HttpStatus.OK);

    }
    @PutMapping("/users")
    public ResponseEntity<User> updateUser(@RequestBody @Valid User user){
        userService.update(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable long id){
        userService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUser(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<User> showOne(@PathVariable ("id") long id) {
        return new ResponseEntity<>(userService.getById(id),HttpStatus.OK);
    }
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRole(){
        return new ResponseEntity<>(roleService.getAllRole(),HttpStatus.OK);
    }
}
