import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { EstudianteServicio } from '../../services/estudiantes.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Output() emmit = new EventEmitter();


  validateForm: FormGroup
  id: any
  constructor(private fb: FormBuilder, private modal: NzModalRef, private estudianteServicio: EstudianteServicio, private notification: NzNotificationService) {

    this.id = this.modal.getConfig()?.nzComponentParams!['idEstudiante']
    this.validateForm = this.fb.group({
      nombre: ["", [Validators.required]],
      direccion:["", [Validators.required]],
      telefono: ["", [Validators.required]],
    });
    
    this.validateForm.patchValue(this.modal.getConfig()?.nzComponentParams || {});
   }

  ngOnInit(): void {
    
  }

  submitForm(): void {
    console.log('data: ', this.modal.getConfig()?.nzComponentParams!['idEstudiante'])
    
    this.estudianteServicio.editarEstudiantes(this.validateForm.value, this.id).subscribe((request: any) => {
      console.log('request: ', request)
      this.modal.close();
      this.notification.create(
        'success',
        'Estudiante actualizado',
        request
      );
    })
    this.emitData()
  }

  cancel(e?: MouseEvent): void {
    if (e) e.preventDefault();
    this.modal.close();
  }

  emitData(): void {
    this.emmit.emit();
  }
}
