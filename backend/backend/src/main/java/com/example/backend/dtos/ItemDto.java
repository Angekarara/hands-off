package com.example.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class ItemDto {
    private Long id;
    private String itemName;
    private String owner;
    private String category;
    private LocalDate expirationDate;
    private Boolean shared;
    private String notes;
}
