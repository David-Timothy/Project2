package com.revature.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    public List<Character> getAllCharactersByAccountId(Long accountId);
    public void deleteCharacterByAccountIdAndCharacterId(Long accountId, Long CharacterId);
}
