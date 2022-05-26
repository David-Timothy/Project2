package com.revature.service;

import com.revature.data.CharacterRepository;
import com.revature.data.RequestRepository;
import com.revature.entity.Character;
import com.revature.entity.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class RequestService {
    @Autowired
    RequestRepository requestRepository;
    @Autowired
    CharacterRepository charRepository;

    public List<Request> findByStatus(String status) {
        return requestRepository.findByStatusIs(status);
    }

    public Request addRequest(Request request) {
        return requestRepository.save(request);
    }

//    public Request findById(int id) {
//        return requestRepository.findById(id).get();
//    }

    public List<Request> findByCharIdIs(Long charId) {
        return requestRepository.findByCharIdIs(charId);
    }


    public Request requestRefund(int id) {
        Request requestDB = requestRepository.findById(id).get();
        requestDB.setStatus("refund requested");
        requestRepository.save(requestDB);
        return requestDB;
    }

    public Request assignCoins(int id) {
        Request requestDB = requestRepository.findById(id).get();
        if (Objects.equals(requestDB.getStatus(), "accepted")) {
            System.out.println("Coins are already assigned");
        } else {
            requestDB.setStatus("accepted");
            requestRepository.save(requestDB);
            Character character = charRepository.findById(requestDB.getCharId()).get();
            character.setCoins(character.getCoins() + requestDB.getAmount());
            charRepository.save(character);
        }
        return requestDB;
    }

//    public Request handleRefund(Request request, int id) {
//        Request requestDB = requestRepository.findById(id).get();
//        requestDB.setCharId(request.getCharId());
//        requestDB.setAmount(request.getAmount());
//        requestDB.setStatus(request.getStatus());
//        requestDB.setCreatedAt(request.getCreatedAt());
//        requestRepository.save(requestDB);
//        if (Objects.equals(request.getStatus(), "refund accepted")) {
//            Character character = charRepository.findById(request.getCharId()).get();
//            character.setCoins(character.getCoins() - request.getAmount());
//            charRepository.save(character);
//        }
//        return requestDB;
//    }

    public Request handleRefund(int id, String status) {
        Request requestDB = requestRepository.findById(id).get();

        if (Objects.equals(requestDB.getStatus(), "refund accepted")) {
            System.out.println("Refund already issued");
        } else {
            requestDB.setStatus(status);
            Character character = charRepository.findById(requestDB.getCharId()).get();
            if (character.getCoins() >= requestDB.getAmount()) {
                character.setCoins(character.getCoins() - requestDB.getAmount());
                charRepository.save(character);
                requestRepository.save(requestDB);
            } else {
                System.out.println("Not enough coins in your character's pocket to proceed with the refund");
            }
        }
        return requestDB;
    }

}
