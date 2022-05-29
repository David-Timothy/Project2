package com.revature.controller;

import com.revature.data.AchievementRepository;
import com.revature.entity.Achievement;
import com.revature.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/achievements")
public class AchievementController {
    @Autowired
    AchievementService achievementService;

    @GetMapping("/{char_id}")
    public List<Achievement> getAllAchievementByCharacterId(@PathVariable("char_id") Long char_id) {
        return achievementService.getAllAchievementByCharId(char_id);
    }
    @PostMapping("")
    public Achievement addAchievement(@RequestBody Achievement achievement) {
        for(Achievement a : achievementService.getAllAchievementByCharId(achievement.getChar_id())) {
            if(a.getName().equals( achievement.getName() ))
                return null;
        }
        return achievementService.addAchievement(achievement);
    }
}
