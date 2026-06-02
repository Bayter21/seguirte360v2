package com.seguirte360.model;
import jakarta.persistence.*;
@Entity
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false) private String username;
    @Column(nullable = false) private String password;
    @Column(nullable = false) private String role;
    private int puntos;
    private int nivel;
    private int streak;
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }
    public String getPassword() { return password; }
    public void setPassword(String p) { this.password = p; }
    public String getRole() { return role; }
    public void setRole(String r) { this.role = r; }
    public int getPuntos() { return puntos; }
    public void setPuntos(int p) { this.puntos = p; }
    public int getNivel() { return nivel; }
    public void setNivel(int n) { this.nivel = n; }
    public int getStreak() { return streak; }
    public void setStreak(int s) { this.streak = s; }
}