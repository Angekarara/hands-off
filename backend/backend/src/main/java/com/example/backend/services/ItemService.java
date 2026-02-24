package com.example.backend.services;

import com.example.backend.models.Item;
import com.example.backend.repositories.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    @Autowired
    private ItemRepo itemRepo;

    public List<Item> getAllItems(){
        return itemRepo.findAll();
    }

    public void saveItem(Item item){
         itemRepo.save(item);
    }

    public void updateItem(long id, Item item){
        Item updatedItem = itemRepo.findById(id).get();
        updatedItem.setCategory(item.getCategory());
        updatedItem.setItemName(item.getItemName());
        updatedItem.setOwner(item.getOwner());
        updatedItem.setExpirationDate(item.getExpirationDate());
        updatedItem.setShared(item.isShared());
        updatedItem.setNotes(item.getNotes());

        itemRepo.save(updatedItem);
    }

    public void deleteItem(long id){
        Item deletedItem = itemRepo.findById(id).get();
        itemRepo.delete(deletedItem);
    }
}
