package com.revature.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;

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
    private Timestamp created_at;
}
