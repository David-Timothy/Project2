package com.revature.service;

import com.revature.data.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterService {
    @Autowired
    CharacterRepository characterRepository;

    public Character addCharacter(Character character) {
        characterRepository.save(character);
        return character;
    }
    public List<Character> getAllCharacterByAccountId(Long accountId) {
        return characterRepository.getAllCharactersByAccountId(accountId);
    }
    public void deleteCharacterById(Long accountId, Long characterId) {
        characterRepository.deleteCharacterByAccountIdAndCharacterId(accountId, characterId);
    }
}
