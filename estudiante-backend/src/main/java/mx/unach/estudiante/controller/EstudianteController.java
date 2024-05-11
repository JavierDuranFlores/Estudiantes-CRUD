package mx.unach.estudiante.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;

import mx.unach.estudiante.entity.EstudianteEntity;
import mx.unach.estudiante.service.impl.EstudianteServiceImpl;

@RestController
@RequestMapping("/estudiante")
@CrossOrigin(origins = "*")
public class EstudianteController {

    @Autowired
    @Qualifier("estudianteServiceImpl")
    private EstudianteServiceImpl estudianteServiceImpl;

    @GetMapping("/list")
    public List<EstudianteEntity> list() {
        return estudianteServiceImpl.findAllEstudiantes();
    }

    @PostMapping("/")
    public ResponseEntity<String> crear(@RequestBody EstudianteEntity estudianteEntity) {
        System.out.println("estudiante: "+ estudianteEntity.getNombre());
        estudianteServiceImpl.createOrUpdateEstudiante(estudianteEntity);
        return new ResponseEntity("El estudiante: " + estudianteEntity.getNombre() + " fue cread con exito", HttpStatus.OK);

    }

    @PutMapping("/{idEstudiante}")
    public ResponseEntity<String> editar(@RequestBody EstudianteEntity estudiante, @PathVariable Integer idEstudiante) {

        EstudianteEntity estudianteEntity = estudianteServiceImpl.findByIdEstudiante(idEstudiante).orElse(null);

        estudianteEntity.setNombre(estudiante.getNombre());
        estudianteEntity.setDireccion(estudiante.getDireccion());
        estudianteEntity.setTelefono(estudiante.getTelefono());

        estudianteServiceImpl.createOrUpdateEstudiante(estudianteEntity);

        return new ResponseEntity("El estudiante: " + estudianteEntity.getNombre() + " fue actualizado con exito", HttpStatus.OK);

    }

    @DeleteMapping("/{idEstudiante}")
    public ResponseEntity<String> eliminar(@PathVariable Integer idEstudiante) {
        EstudianteEntity estudianteEntity = estudianteServiceImpl.findByIdEstudiante(idEstudiante).orElse(null);
        estudianteServiceImpl.deleteByIdEstudiante(idEstudiante);

        return new ResponseEntity("El estudiante: " + estudianteEntity.getNombre() + " fue eliminado con exito", HttpStatus.OK);

    }
    
    @RequestMapping( path = {"/", ""}, method = RequestMethod.GET  )
    public String home(Model modelo) {
        List<EstudianteEntity> estudiantes = estudianteServiceImpl.findAllEstudiantes();
        modelo.addAttribute("estudiantes", estudiantes);
        return "index";
    }


    @RequestMapping( path = "/nuevo", method = RequestMethod.GET)
	public String mostratFormularioRegistroContacto(Model modelo) {
		modelo.addAttribute("estudiante", new EstudianteEntity());
		return "nuevo";
	}

    @RequestMapping( path = "/nuevo", method = RequestMethod.POST)
    public String mostartFormRegistroContacto(@Validated EstudianteEntity estudiante, 
    										  BindingResult bindingResult,
    										  RedirectAttributes redirect,
    										  Model modelo) {
		if (bindingResult.hasErrors()) {
			modelo.addAttribute("estudiante", estudiante);
			return "nuevo";
		}
		
		estudianteServiceImpl.createOrUpdateEstudiante(estudiante);
    	redirect.addFlashAttribute("msgExito", "El estudiante ha sido agregado con exito");
    	
        return "redirect:/";
    }

    @RequestMapping( path = "/{id}/editar/", method = RequestMethod.GET)
    public String mostratFormularioEditarContacto(@PathVariable Integer id,  Model modelo) {
        EstudianteEntity estudiante = estudianteServiceImpl.findByIdEstudiante(id).orElse(null);
        modelo.addAttribute("estudiante", estudiante);
        System.out.println("hola");
        return "nuevo";
    }

    @RequestMapping( path = "/{id}/editar/", method = RequestMethod.POST)
    public String actualizarContacto(@PathVariable Integer id, @Validated EstudianteEntity estudiante,
                                              BindingResult bindingResult,
                                              RedirectAttributes redirect,
                                              Model modelo) {
        EstudianteEntity estudianteDB = estudianteServiceImpl.findByIdEstudiante(id).orElse(null);
        System.out.println("estudiante: "+estudianteDB);

        if (bindingResult.hasErrors()) {
            modelo.addAttribute("estudiante", estudiante);
            return "nuevo";
        }

        estudianteDB.setNombre(estudiante.getNombre());
        estudianteDB.setDireccion(estudiante.getDireccion());
        estudianteDB.setTelefono(estudiante.getTelefono());

        estudianteServiceImpl.createOrUpdateEstudiante(estudianteDB);
        redirect.addFlashAttribute("msgExito", "El estudiante ha sido actualizado correctamente");

        return "redirect:/";
    }

    @RequestMapping( path = "/{id}/eliminar/", method = RequestMethod.POST)
    public String eliminarContacto(@PathVariable Integer id, RedirectAttributes redirect) {
        estudianteServiceImpl.deleteByIdEstudiante(id); 
        redirect.addFlashAttribute("msgExito", "El estudiante ha sido eliminado correctamente");
        return "redirect:/";
    }

}