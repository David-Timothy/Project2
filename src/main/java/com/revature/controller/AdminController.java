package com.revature.controller;


import com.revature.entity.Account;
import com.revature.entity.Character;
import com.revature.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/login")
    public Account login(@RequestBody Account admin) {
        return adminService.login(admin);
    }

    @GetMapping("/allchar")
    public List<Character> allCharacter() {
        return adminService.allCharacter();
    }

    @GetMapping("/char/{id}")
    public Character getCharacterById(@PathVariable("id") Long id) {
        return adminService.getCharacterById(id);
    }

    @DeleteMapping("/char/{id}")
    public void deleteCharacter(@PathVariable("id") Long id) {
        adminService.deleteCharacter(id);
    }

    @DeleteMapping("/account/{id}")
    public void deleteAccount(@PathVariable("id") Long id) {
        adminService.deleteAccount(id);
    }
}
