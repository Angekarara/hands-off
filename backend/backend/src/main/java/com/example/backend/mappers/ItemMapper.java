package com.example.backend.mappers;

import com.example.backend.dtos.ItemDto;
import com.example.backend.models.Item;
import com.example.backend.models.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ItemMapper {
    
    public ItemDto toDto(Item item) {
        ItemDto itemDto = new ItemDto();
        itemDto.setId(item.getId());
        itemDto.setItemName(item.getItemName());
        itemDto.setOwner(item.getOwner());
        itemDto.setCategory(item.getCategory());
        itemDto.setExpirationDate(item.getExpirationDate());
        itemDto.setShared(item.getShared());
        itemDto.setNotes(item.getNotes());
        return itemDto;
    }

    public Item toEntity(ItemDto itemDto, User ownerUser) {
        Item item = new Item();
        item.setItemName(itemDto.getItemName());
        item.setOwner(ownerUser);
        item.setCategory(itemDto.getCategory());
        item.setExpirationDate(itemDto.getExpirationDate());
        item.setShared(itemDto.getShared());
        item.setNotes(itemDto.getNotes());
        return item;
    }
    
    public List<ItemDto> toDtoList(List<Item> items) {
        return items.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
