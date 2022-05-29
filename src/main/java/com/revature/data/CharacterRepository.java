package com.revature.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.revature.entity.Character;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
    @Query(value = "SELECT * FROM character as c left join account as a on c.account_id = a.id WHERE account_id = ?1 ORDER BY c.id ", nativeQuery = true)
    public List<Character> getAllCharactersByAccountId(Long account_id);

    @Query(value = "DELETE FROM character WHERE id = ?1", nativeQuery = true)
    public void deleteCharacterByAccountIdAndCharacterId(Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE character SET coins = ?1 WHERE id =?2", nativeQuery = true)
    public int setCoinsByCharacter(int coins,Long id);

}
