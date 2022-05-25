package com.revature.controller;

import com.revature.entity.Achievement;
import com.revature.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return achievementService.addAchievement(achievement);
    }
}
