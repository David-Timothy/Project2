package com.revature.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Request {
    @Id
    @GeneratedValue
    private int id;
    private Long charId;
    private int amount;
    private String status;
    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp created_at;

}

