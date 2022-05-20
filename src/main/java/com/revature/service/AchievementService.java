package com.revature.service;

import com.revature.data.AchievementRepository;
import com.revature.entity.Achievement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementService {
    @Autowired
    AchievementRepository achievementRepository;

    public Achievement addAchievement(Achievement achievement) {
        achievementRepository.save(achievement);
        return achievement;
    }
    public List<Achievement> getAllAchievementByCharId(Long id) {
        return achievementRepository.getAllAchievementByCharId(id);
    }
}
