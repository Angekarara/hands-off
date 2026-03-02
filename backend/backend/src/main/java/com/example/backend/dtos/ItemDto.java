package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class ItemDto {

    private Long id;

    @NotBlank(message = "Item name must not be blank")
    @Size(max = 100, message = "Item name must be at most 100 characters")
    private String itemName;

    @NotBlank(message = "Owner must not be blank")
    @Size(max = 50, message = "Owner name must be at most 50 characters")
    private String owner;

    @NotBlank(message = "Category must not be blank")
    @Size(max = 50, message = "Category must be at most 50 characters")
    private String category;

    private LocalDate expirationDate;

    @NotNull(message = "Shared flag must not be null")
    private Boolean shared;

    @Size(max = 500, message = "Notes must be at most 500 characters")
    private String notes;
}
