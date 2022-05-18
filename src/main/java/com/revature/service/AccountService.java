package com.revature.service;

import com.revature.data.AccountRepository;
import com.revature.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepository;

    public Account register(Account account){
        accountRepository.save(account);
        return account;
    }

    public Account update_username(Account account, Long id){
        Account accountDB = accountRepository.findById(id).get();
        accountDB.setUsername(account.getUsername());
        accountRepository.save(accountDB);
        return accountDB;
    }

    public List<Account> get_all_accounts() {return accountRepository.findAll();}

    public void delete_account(Long id) {accountRepository.deleteById(id);}

    public void login(String username, String password){

    }

//    public Account getPassword(String username) {
//        Account accountPassword = ;
//
//    }
}


