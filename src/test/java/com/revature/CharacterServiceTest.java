package com.revature;

import com.revature.service.CharacterService;
import com.revature.entity.Character;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class CharacterServiceTest {
    @Autowired
    CharacterService characterService;

    @Before

    @Test
    public void addCharacterTest() {
        Character character = new Character((long)1,"testName", 0);
        Character result = characterService.addCharacter(character);
        assertEquals(character, result);
    }
    @Test
    public void deleteCharacterById() {

    }
}
