package com.revature.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Character {
    @Id
    // auto-generate ids (like serial in psql)
    @GeneratedValue
    private Long id;
    private Long account_id;
    private String name;
    private int coins;
    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp created_at;

    public Character(Long account_id, String name, int coins, Timestamp created_at) {
        this.account_id = account_id;
        this.name = name;
        this.coins = coins;
        this.created_at = created_at;
    }
}
