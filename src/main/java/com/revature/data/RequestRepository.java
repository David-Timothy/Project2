package com.revature.data;

import com.revature.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Integer> {

    public List<Request> findByStatusIs(String status);
    //
    public List<Request> findByCharIdIs(Long id);

}

