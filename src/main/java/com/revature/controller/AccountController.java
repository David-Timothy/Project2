package com.revature.controller;


import com.revature.entity.Account;
import com.revature.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    AccountService accountService;

    @PostMapping("/register")
    public Account register(@RequestBody Account account){
        System.out.println("Account registered!");
        return accountService.register(account);
    }

    @RequestMapping("/update/{id}")
    public Account update_username(@RequestBody Account account, @PathVariable("id")Long id) {
        return accountService.update_username(account,id);
    }

    @DeleteMapping("/delete/{id_to_delete}")
    public void delete_account(@PathVariable("id_to_delete") Long id) {accountService.delete_account(id);}


    @GetMapping("/getall")
    public List<Account> getAll(){return accountService.get_all_accounts();}


}


