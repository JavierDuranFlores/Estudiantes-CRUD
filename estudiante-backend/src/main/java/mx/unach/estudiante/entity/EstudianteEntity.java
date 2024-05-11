package mx.unach.estudiante.entity;

import java.io.Serializable;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="estudiantes")
public class EstudianteEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estudiante")
    @Getter @Setter
    private Integer idEstudiante;

    @NotBlank( message = "Debe ingresar su nombre")
    @Column(name = "nombre")
    @Getter @Setter
    private String nombre;

    @NotBlank( message = "Debe ingresar su direccion")
    @Column(name = "direccion")
    @Getter @Setter
    private String direccion;

    @NotBlank( message = "Debe ingresar su telefono")
    @Column(name = "telefono")
    @Getter @Setter
    private String telefono;

}