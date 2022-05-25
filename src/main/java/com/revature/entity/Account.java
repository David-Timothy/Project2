package com.revature.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private String email;
    private String account_type;
    @Column(name = "created_at")
    @CreationTimestamp
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
    //Constructor with no id
    public Account(String username, String password, String email, String account_type, Timestamp created_at) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.account_type = account_type;
        this.created_at = created_at;
    }
    public Account(String username, String password, String email, String account_type) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.account_type = account_type;
    }
}
