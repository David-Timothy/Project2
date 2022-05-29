package com.revature.data;

import com.revature.entity.Account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

//    Optional<Account> findByLoginAndPassword(String username, String password);


}
