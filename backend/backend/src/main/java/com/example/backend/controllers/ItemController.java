package com.example.backend.controllers;

import com.example.backend.dtos.ItemDto;
import com.example.backend.mappers.ItemMapper;
import com.example.backend.models.Item;
import com.example.backend.services.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class ItemController {

    private final ItemService itemService;
    private final ItemMapper itemMapper;

    public ItemController(ItemService itemService, ItemMapper itemMapper){
        this.itemService = itemService;
        this.itemMapper = itemMapper;
    }

    @GetMapping(value = "/items")
    public ResponseEntity<List<ItemDto>> getItem(){
        List<Item> items = itemService.getAllItems();
        List<ItemDto> itemDtos = itemMapper.toDtoList(items);
        return ResponseEntity.ok(itemDtos);
    }
    @PostMapping(value = "/save")
    public ResponseEntity<Void> saveItem(@RequestBody ItemDto itemDto){
        Item item = itemMapper.toEntity(itemDto);
        itemService.saveItem(item);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Void> updateItem(@PathVariable long id, @RequestBody ItemDto itemDto){
        var existingItem = itemService.getItemById(id);
        if (existingItem.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Item item = itemMapper.toEntity(itemDto);
        itemService.updateItem(id, item);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable long id){
        var existingItem = itemService.getItemById(id);
        if (existingItem.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

}
