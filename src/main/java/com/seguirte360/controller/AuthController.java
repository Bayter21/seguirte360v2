package com.seguirte360.controller;

import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;
import com.seguirte360.repo.*;
import com.seguirte360.model.*;
import org.springframework.security.crypto.bcrypt.*;

@Controller
public class AuthController {

    private final UsuarioRepo repo;
    private final BCryptPasswordEncoder enc;

    public AuthController(UsuarioRepo r, BCryptPasswordEncoder e) {
        repo = r;
        enc = e;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/register")
    public String reg() {
        return "register";
    }

    @PostMapping("/register")
    public String save(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam(defaultValue = "STUDENT") String role) {

        // Validate role value to prevent arbitrary role assignment
        String safeRole = "TEACHER".equalsIgnoreCase(role) ? "TEACHER" : "STUDENT";

        Usuario u = new Usuario();
        u.setUsername(username);
        u.setPassword(enc.encode(password));
        u.setRole(safeRole);
        u.setNivel(1);
        u.setPuntos(0);
        u.setStreak(0);
        repo.save(u);
        return "redirect:/login";
    }
}
