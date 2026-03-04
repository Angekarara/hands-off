package com.example.backend.controllers;

import com.example.backend.dtos.ItemDto;
import com.example.backend.mappers.ItemMapper;
import com.example.backend.models.Item;
import com.example.backend.services.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Void> saveItem(@Valid @RequestBody ItemDto itemDto, Principal principal){
        Item item = itemMapper.toEntity(itemDto);
        item.setOwner(principal.getName());
        itemService.saveItem(item);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Void> updateItem(@PathVariable long id, @Valid @RequestBody ItemDto itemDto, Principal principal){
        var existingItem = itemService.getItemById(id);
        if (existingItem.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        if (!principal.getName().equals(existingItem.get().getOwner())) {
            return ResponseEntity.status(403).build();
        }
        Item item = itemMapper.toEntity(itemDto);
        item.setOwner(existingItem.get().getOwner());
        itemService.updateItem(id, item);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable long id, Principal principal){
        var existingItem = itemService.getItemById(id);
        if (existingItem.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        if (!principal.getName().equals(existingItem.get().getOwner())) {
            return ResponseEntity.status(403).build();
        }
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException exception){
        var errors = new HashMap<String, String>();

        exception.getBindingResult().getFieldErrors().forEach((FieldError error) -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return ResponseEntity.badRequest().body(errors);
    }

}
