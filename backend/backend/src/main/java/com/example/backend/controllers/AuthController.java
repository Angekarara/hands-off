package com.example.backend.controllers;

import com.example.backend.dtos.LoginRequest;
import com.example.backend.dtos.RegisterRequest;
import com.example.backend.mappers.UserMapper;
import com.example.backend.repositories.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;


@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;


    @PostMapping
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, UriComponentsBuilder uriBuilder){
        if(userRepository.existsByEmail(request.getEmail())){
            return ResponseEntity.badRequest().body(Map.of("email", "Email is already registered"));
        }
        if(!request.getPassword().equals(request.getConfirmPassword())){
            return ResponseEntity.badRequest().body(Map.of("password", "Passwords do not match"));
        }
        var user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        var userDto = userMapper.toDto(user);
        var uri = uriBuilder.path("/users/{id}").buildAndExpand(userDto.getId()).toUri();

        return ResponseEntity.created(uri).body(userDto);
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request){
        var user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if(user == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        var userDto = userMapper.toDto(user);
        return ResponseEntity.ok(userDto);
    }

}
