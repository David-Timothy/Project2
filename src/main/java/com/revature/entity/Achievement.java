package com.revature.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Achievement {
    @Id
    @GeneratedValue
    private Long id;
    private Long char_id;
    private String name;
    private String description;
    public Achievement(Long char_id, String name, String description) {
        this.char_id = char_id;
        this.name = name;
        this.description = description;
    }
}
