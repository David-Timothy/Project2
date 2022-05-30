package com.revature;

import com.revature.entity.Account;
import com.revature.service.AccountService;
import com.revature.service.CharacterService;
import com.revature.entity.Character;
import org.junit.Before;
//import org.junit.Test;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class CharacterServiceTest {
    @Autowired
    CharacterService characterService;

    @Autowired
    AccountService accountService;

    @BeforeEach
    public void addAccount() {
        Account account = accountService.register(new Account("test", "test", "test@test.com", "User"));
    }
    @Test
    public void addCharacterTest() {
        Character character = new Character((long)1,"testName", 0);
        Character result = characterService.addCharacter(character);
        assertEquals(character, result);
    }
    @Test
    public void getAllCharacterByAccountIdTest() {
        List<Character> characters = characterService.getAllCharacterByAccountId((long)1);
        Character character = new Character((long)1,"testName", 0);
        assertEquals(character.getName(),characters.get(0).getName());
    }
    @Test
    public void setCoinsByCharacterTest() {
        List<Character> characters = characterService.getAllCharacterByAccountId((long)1);
        Character character = characters.get(0);
        character.setCoins(10);
        characterService.setCoinsByCharacter(character);
        List<Character> characters2 = characterService.getAllCharacterByAccountId((long)1);
        Character character2 = characters2.get(0);
        assertEquals( 10,character2.getCoins());
    }
    @Test
    public void deleteCharacterByIdTest() {
        characterService.deleteCharacterById((long)2);
        List<Character> characters = characterService.getAllCharacterByAccountId((long)1);
        assertEquals(new ArrayList<Character>(), characters);
    }
    @Test
    public void characterTest() {
        List<Character> characters = characterService.getAllCharacterByAccountId((long)1);
        Character character = characters.get(0);
        assertEquals((long)2, (long)character.getId());
        character.getCreated_at();
        character.getAccount_id();
        character.getAchievements();
    }

}
