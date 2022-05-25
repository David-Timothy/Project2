package com.revature.data;

import com.revature.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface AdminRepository extends JpaRepository<Account, Long> {

    @Query(value = "SELECT * FROM account WHERE username=?1 AND password =?2 AND account_type = 'Admin'", nativeQuery = true)
    public Account login(String username, String password);
}
