package mx.unach.estudiante.service.impl;

import java.util.List;
import java.util.Optional;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import mx.unach.estudiante.entity.EstudianteEntity;
import mx.unach.estudiante.repository.EstudianteRepository;
import mx.unach.estudiante.service.EstudianteService;

@Service("estudianteServiceImpl")
@Transactional
public class EstudianteServiceImpl implements EstudianteService {

    @Autowired
    @Qualifier("estudianteRepository")
    private EstudianteRepository estudianteRepository;

    @Override
    public List<EstudianteEntity> findAllEstudiantes() {
        return (List<EstudianteEntity>) estudianteRepository.findAll();

    }

    @Override
    public Optional<EstudianteEntity> findByIdEstudiante(Integer idEstudiante) {
        return estudianteRepository.findById(idEstudiante);

    }

    @Override
    public EstudianteEntity createOrUpdateEstudiante(EstudianteEntity idEstudiante) {
        return estudianteRepository.save(idEstudiante);

    }

    @Override
    public Integer deleteByIdEstudiante(Integer idEstudiante) {
        return estudianteRepository.deleteByIdEstudiante(idEstudiante);

    }

}