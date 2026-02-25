package com.example.backend.models;

@lombok.Getter
@lombok.Setter@jakarta.persistence.Entity
@jakarta.persistence.Table(name = "items")
public class Item {
@jakarta.persistence.Id
@jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
@jakarta.persistence.Column(name = "id", nullable = false)
private java.lang.Long id;

@jakarta.validation.constraints.Size(max = 255)
@jakarta.persistence.Column(name = "category")
private java.lang.String category;

@jakarta.persistence.Column(name = "expiration_date")
private java.time.LocalDate expirationDate;

@jakarta.validation.constraints.Size(max = 255)
@jakarta.persistence.Column(name = "owner")
private java.lang.String owner;

@jakarta.validation.constraints.Size(max = 255)
@jakarta.persistence.Column(name = "item_name")
private java.lang.String itemName;

@jakarta.validation.constraints.Size(max = 1000)
@jakarta.persistence.Column(name = "notes", length = 1000)
private java.lang.String notes;

@jakarta.validation.constraints.NotNull
@org.hibernate.annotations.ColumnDefault("false")
@jakarta.persistence.Column(name = "shared", nullable = false)
private java.lang.Boolean shared;



}