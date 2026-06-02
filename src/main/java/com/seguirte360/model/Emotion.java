<<<<<<< HEAD
package com.seguirte360.model;

import jakarta.persistence.*;
import java.time.*;

@Entity
public class Emotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private LocalDateTime fecha;

    @ManyToOne
    private Usuario usuario;

    public Long getId()            { return id; }
    public String getType()        { return type; }
    public void setType(String t)  { type = t; }
    public LocalDateTime getFecha(){ return fecha; }
    public void setFecha(LocalDateTime f) { fecha = f; }
    public Usuario getUsuario()    { return usuario; }
    public void setUsuario(Usuario u) { usuario = u; }
}
=======
package com.seguirte360.model;import jakarta.persistence.*;import java.time.*;
@Entity public class Emotion{ @Id @GeneratedValue private Long id; private String type; private LocalDateTime fecha; @ManyToOne private Usuario usuario;
public void setType(String t){type=t;} public String getType(){return type;} public void setFecha(LocalDateTime f){fecha=f;} public void setUsuario(Usuario u){usuario=u;}}
>>>>>>> d1afb8a2d6ff0391480e35400c59fef03657533c
