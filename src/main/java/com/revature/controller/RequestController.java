package com.revature.controller;


import com.revature.entity.Request;
import com.revature.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    RequestService requestService;


    @PostMapping
    public Request buyCoins(@RequestBody Request request) {
        request.setStatus("pending");
        return requestService.addRequest(request);
    }

    //past purchases
    //printing?


    @PutMapping("/refund/{id}")
    public Request requestRefund(@PathVariable("id") int id) {
        return requestService.requestRefund(id);
    }


    @PutMapping("/admin/assign/{id}")
    public Request assignCoins(@PathVariable("id") int id) {
        return requestService.assignCoins(id);
    }


    @PutMapping("/admin/refund/{id}")
    public Request handleRefund(@PathVariable("id") int id, @RequestParam String status) {
        return requestService.handleRefund(id, status);
    }


    @GetMapping("/admin/{status}")
    public List<Request> getRequestsByStatus(@PathVariable("status") String status) {
        System.out.println(status);
        return requestService.findByStatus(status);
    }

}
