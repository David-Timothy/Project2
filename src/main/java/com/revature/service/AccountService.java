package com.revature.service;

import com.revature.data.AccountRepository;
import com.revature.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

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

    public Account update_password(Account account, Long id){
        Account accountDB = accountRepository.findById(id).get();
        accountDB.setPassword(account.getPassword());
        accountRepository.save(accountDB);
        return accountDB;
    }

    public List<Account> get_all_accounts() {return accountRepository.findAll();}

    public void delete_account(Long id) {accountRepository.deleteById(id);}
//
    public Account authenticate (Account account) {
        List<Account> dbAccounts = accountRepository.findAll();
        System.out.println(dbAccounts);

        for (int i = 0; i < dbAccounts.size(); i++ ){
            System.out.println(account.getUsername() + " " + account.getPassword());
            System.out.println(dbAccounts.get(i).getUsername() + " " + dbAccounts.get(i).getPassword());
            if(dbAccounts.get(i).getUsername().equals(account.getUsername()) && dbAccounts.get(i).getPassword().equals(account.getPassword())){
                System.out.println("Account is authenticated!");
                return dbAccounts.get(i);
            } else {
                System.out.println("Account cannot be authenticated");
            }
        }

        return null;
    }
}


