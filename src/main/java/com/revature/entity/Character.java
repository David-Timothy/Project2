package com.revature.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.Column;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
@Entity
public class Character {

    @Id
    @GeneratedValue
    private Long id;
    private Long account_id;
    private String name;
    private int coins;
    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp created_at;
    @OneToMany(mappedBy = "char_id")
    private List<Achievement> achievements;


//    public Character(Long account_id, String name, int coins, Timestamp created_at) {
//        this.account_id = account_id;
//        this.name = name;
//        this.coins = coins;
//        this.created_at = created_at;
//    }
    public Character(Long account_id, String name, int coins) {
        this.account_id = account_id;
        this.name = name;
        this.coins = coins;
    }
}
