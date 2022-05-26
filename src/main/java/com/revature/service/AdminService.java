package com.revature.service;

import com.revature.data.AdminCharacterRepository;
import com.revature.data.AdminRepository;
import com.revature.entity.Character;
import com.revature.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;
    @Autowired
    AdminCharacterRepository adminCharacterRepository;

    public Account login(Account admin) {
        return adminRepository.login(admin.getUsername(), admin.getPassword());
    }

    public List<Character> allCharacter() {
        return adminCharacterRepository.allCharacter();
    }

    public Character getCharacterById(Long id) {return adminCharacterRepository.findById(id).get();}

    public void deleteCharacter(Long id) {
        adminCharacterRepository.deleteById(id);
    }

    public void deleteAccount(Long id) {
        adminRepository.deleteById(id);
    }
}
