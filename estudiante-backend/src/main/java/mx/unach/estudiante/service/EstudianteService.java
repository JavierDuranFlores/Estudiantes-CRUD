package mx.unach.estudiante.service;

import java.util.List;
import java.util.Optional;
import mx.unach.estudiante.entity.EstudianteEntity;

public interface EstudianteService {

    public abstract List<EstudianteEntity> findAllEstudiantes();
    public abstract Optional<EstudianteEntity> findByIdEstudiante(Integer idEstudiante);
    public abstract EstudianteEntity createOrUpdateEstudiante(EstudianteEntity estudianteEntity);
    public abstract Integer deleteByIdEstudiante(Integer idEstudiante);
}