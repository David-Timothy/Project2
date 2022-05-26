package com.revature.controller;

import com.revature.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.revature.entity.Character;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/characters")
public class CharacterController {
    @Autowired
    CharacterService characterService;

    @PostMapping("")
    public Character addCharacter(@RequestBody Character character) {
        characterService.addCharacter(character);
        return character;
    }
    @GetMapping("/{account_id}")
    public List<Character> getAllCharacterByAccountId(@PathVariable("account_id") Long account_id) {
        return characterService.getAllCharacterByAccountId(account_id);
    }

    @DeleteMapping("/{id}")
    public void deleteCharacter(@PathVariable("id") Long id) {
        characterService.deleteCharacterById(id);
    }

    @PutMapping("")
    public int setCoinsByCharacter(@RequestBody Character character) {
        return characterService.setCoinsByCharacter(character);
    }
}
