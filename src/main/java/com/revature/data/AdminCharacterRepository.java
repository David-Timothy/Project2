package com.revature.data;

import com.revature.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminCharacterRepository extends JpaRepository<Character, Long> {
    @Query(value ="SELECT * FROM character ORDER BY account_id", nativeQuery = true)
    public List<Character> allCharacter();
}
