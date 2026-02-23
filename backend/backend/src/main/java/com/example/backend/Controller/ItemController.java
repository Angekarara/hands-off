package com.example.backend.Controller;

import com.example.backend.Model.Item;
import com.example.backend.Repo.ItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemController {

    @Autowired
    private ItemRepo itemRepo;

    @GetMapping(value = "/items")
    public List<Item> getItem(){
        return itemRepo.findAll();
    }
    @PostMapping(value = "/save")
    public String saveItem(@RequestBody Item item){
        itemRepo.save(item);
        return "saved..";
    }

    @PutMapping(value = "/update/{id}")
    public String updateItem(@PathVariable long id, @RequestBody Item item){
        Item updatedItem= itemRepo.findById(id).get();
        updatedItem.setCategory(item.getCategory());
        updatedItem.setItemName(item.getItemName());
        updatedItem.setOwner(item.getOwner());
        updatedItem.setExpirationDate(item.getExpirationDate());
        updatedItem.setShared(item.isShared());
        updatedItem.setNotes(item.getNotes());

        itemRepo.save(updatedItem);
        return "Updated..";
}

@DeleteMapping(value = "/delete/{id}")
    public String deleteItem(@PathVariable long id){
        Item deletedItem = itemRepo.findById(id).get();
        itemRepo.delete(deletedItem);

        return "delete..";
}

}
