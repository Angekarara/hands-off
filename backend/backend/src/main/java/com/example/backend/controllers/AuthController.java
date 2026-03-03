package com.example.backend.controllers;

import com.example.backend.dtos.JwtResponse;
import com.example.backend.dtos.LoginRequest;
import com.example.backend.dtos.RegisterRequest;
import com.example.backend.mappers.UserMapper;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.JwtService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;


    @PostMapping
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request){
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

        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);
        
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }

        String token = jwtService.generateToken(request.getEmail());
        return ResponseEntity.ok(new JwtResponse(token));
    }

}
