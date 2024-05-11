package mx.unach.estudiante.repository;


import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import mx.unach.estudiante.entity.EstudianteEntity;

@Repository("estudianteRepository")
public interface EstudianteRepository extends CrudRepository<EstudianteEntity, Integer>{

    Integer deleteByIdEstudiante(Integer idEstudiante);

}