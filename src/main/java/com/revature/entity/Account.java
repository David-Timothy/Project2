package com.revature.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
@Entity
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String password;
    private String email;
    private String account_type;
    private Timestamp created_at;

    //set up our one to many relationship one cart has many book
    @OneToMany(targetEntity = Character.class, cascade = CascadeType.ALL)
    // each book will have a cart that it belongs to
    // this creates a cart_fk column in book table which references to Cart id.
    @JoinColumn(name="account_id", referencedColumnName = "id")
    private Set<Character> characters;

    public Account(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
