package com.revature.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="OWNER_ID")
    private Character character;

    public Achievement(Long char_id, String name, String description) {
        this.char_id = char_id;
        this.name = name;
        this.description = description;
    }
}
