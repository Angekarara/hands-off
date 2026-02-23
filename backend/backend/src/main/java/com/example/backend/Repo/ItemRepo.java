package com.example.backend.Repo;

import com.example.backend.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepo extends JpaRepository<Item, Long> {

}
