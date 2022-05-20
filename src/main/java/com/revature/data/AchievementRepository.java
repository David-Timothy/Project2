package com.revature.data;

import com.revature.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    @Query(value = "SELECT * FROM achievement WHERE char_id = ?1", nativeQuery = true)
    public List<Achievement> getAllAchievementByCharId(Long id);
}
