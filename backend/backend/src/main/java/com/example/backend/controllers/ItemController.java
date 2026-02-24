package com.example.backend.controllers;

import com.example.backend.models.Item;
import com.example.backend.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping(value = "/items")
    public List<Item> getItem(){
        return itemService.getAllItems();
    }
    @PostMapping(value = "/save")
    public String saveItem(@RequestBody Item item){
        itemService.saveItem(item);
        return "saved..";
    }

    @PutMapping(value = "/update/{id}")
    public String updateItem(@PathVariable long id, @RequestBody Item item){
        itemService.updateItem(id, item);
        return "Updated..";
}

@DeleteMapping(value = "/delete/{id}")
    public String deleteItem(@PathVariable long id){
        itemService.deleteItem(id);
        return "delete..";
}

}
