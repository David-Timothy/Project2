package com.revature.service;

import com.revature.data.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.entity.Character;
import java.util.List;

@Service
public class CharacterService {
    @Autowired
    CharacterRepository characterRepository;

    public Character addCharacter(Character character) {
        characterRepository.save(character);
        return character;
    }
    public List<Character> getAllCharacterByAccountId(Long account_id) {
        return characterRepository.getAllCharactersByAccountId(account_id);
    }
    public void deleteCharacterById(Long id) {
//        characterRepository.deleteCharacterByAccountIdAndCharacterId(id);
        characterRepository.deleteById(id);
    }
    public int setCoinsByCharacter(Character character) {
         return characterRepository.setCoinsByCharacter(character.getCoins(), character.getId());
    }
}
