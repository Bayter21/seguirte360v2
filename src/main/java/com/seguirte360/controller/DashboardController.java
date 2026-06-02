package com.seguirte360.controller;

import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.*;
import java.security.Principal;
import java.time.*;
import java.util.*;
import com.seguirte360.repo.*;
import com.seguirte360.model.*;

@Controller
public class DashboardController {

    private final UsuarioRepo urepo;
    private final EmotionRepo erepo;

    public DashboardController(UsuarioRepo u, EmotionRepo e) {
        urepo = u;
        erepo = e;
    }

    @GetMapping("/")
    public String home(Principal p) {
        if (p == null) return "redirect:/login";
        Usuario u = urepo.findByUsername(p.getName());
        if (u != null && "TEACHER".equals(u.getRole())) {
            return "redirect:/teacher";
        }
        return "redirect:/dashboard";
    }

    @GetMapping("/dashboard")
    public String dash(Model m, Principal p) {
        Usuario u = urepo.findByUsername(p.getName());
        List<Emotion> list = erepo.findByUsuario(u);
        long r = list.stream().filter(e -> "RED".equals(e.getType())).count();
        m.addAttribute("user", u);
        m.addAttribute("alerta", r >= 3 ? "🚨 Riesgo" : "");
        return "dashboard";
    }

    @PostMapping("/emotion")
    public String save(@RequestParam String type, Principal p) {
        Usuario u = urepo.findByUsername(p.getName());
        Emotion em = new Emotion();
        em.setType(type);
        em.setFecha(LocalDateTime.now());
        em.setUsuario(u);
        erepo.save(em);
        u.setPuntos(u.getPuntos() + 10);
        u.setStreak(u.getStreak() + 1);
        if (u.getPuntos() >= 100) {
            u.setNivel(u.getNivel() + 1);
            u.setPuntos(0);
        }
        urepo.save(u);
        return "redirect:/dashboard";
    }

    @GetMapping("/teacher")
    public String teacher(Model m, Principal p) {
        m.addAttribute("usuarios", urepo.findAll());
        // Pass current user info for the teacher's own sidebar
        if (p != null) {
            m.addAttribute("currentUser", urepo.findByUsername(p.getName()));
        }
        return "teacher";
    }
}
