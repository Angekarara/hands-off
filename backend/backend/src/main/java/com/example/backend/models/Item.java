package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Size(max = 255)
    @Column(name = "category")
    private String category;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner", referencedColumnName = "email")
    private User ownerUser;

    @Size(max = 255)
    @Column(name = "item_name")
    private String itemName;

    @Size(max = 1000)
    @Column(name = "notes", length = 1000)
    private String notes;

    @NotNull
    @ColumnDefault("false")
    @Column(name = "shared", nullable = false)
    private Boolean shared;

    public String getOwner() {
        return ownerUser != null ? ownerUser.getEmail() : null;
    }

    public void setOwner(User user) {
        this.ownerUser = user;
    }
}