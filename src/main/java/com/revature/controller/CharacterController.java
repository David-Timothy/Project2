package com.revature.controller;

import com.revature.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/characters")
public class CharacterController {
    @Autowired
    UserService userService;

    @PostMapping(value = "/add")
    public Character addCharacter(@RequestBody Character character) {
        return character;
    }
}
