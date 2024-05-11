import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { EstudianteServicio } from '../../services/estudiantes.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

@Output() emmit = new EventEmitter();


  validateForm: FormGroup = this.fb.group({
    nombre: ["", [Validators.required]],
    direccion:["", [Validators.required]],
    telefono: ["", [Validators.required]],
  });

  constructor(private fb: FormBuilder, private modal: NzModalRef, private estudianteServicio: EstudianteServicio, private notification: NzNotificationService) { }

  ngOnInit(): void {
  }

  submitForm(): void {
    this.estudianteServicio.crearEstudiantes(this.validateForm.value).subscribe((request: any) => {
      this.modal.close();
      this.notification.create(
        'success',
        'Estudiante creado',
        request
      );
    });
   
  }
  
  cancel(e?: MouseEvent): void {
    if (e) e.preventDefault();
    this.modal.close();
  }

  emitData(): void {
    this.emmit.emit();
  }

  
}
