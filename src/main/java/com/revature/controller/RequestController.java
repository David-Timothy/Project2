package com.revature.controller;


import com.revature.entity.Request;
import com.revature.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// we can access this from anywhere, if we don't have this, we will be blocked by CORS:
@CrossOrigin(origins = "*")
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

    @GetMapping("/{charId}")
    public List<Request> getAllRequests(@PathVariable("charId") Long charId) {
        return requestService.findByCharIdIs(charId);
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


    @GetMapping("/admin/status")
    public List<Request> getRequestsByStatus(@RequestParam String status) {
        return requestService.findByStatus(status);
    }

}
