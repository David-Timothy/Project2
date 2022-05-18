package com.revature.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Data
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
    private Timestamp create_at;

    //Constructor with no id
    public Account(String username, String password, String email, String account_type, Timestamp create_at) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.account_type = account_type;
        this.create_at = create_at;
    }
}
