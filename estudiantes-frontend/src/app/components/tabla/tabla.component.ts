import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { error } from 'console';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EstudianteServicio } from 'src/app/services/estudiantes.service';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';

interface Estudiante {
  idEstudiante: number;
  nombre: string;
  direccion: string;
  telefono: string;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @ViewChild(TablaComponent) tabla!: TablaComponent;

  total = 1;
  pageIndex = 1;
  pageSize = 5;
  totalFooter = `0 Registros encontrados.`;

  estudiantes: Estudiante[] = [];

  constructor(private estudiantesSerice: EstudianteServicio, private modal: NzModalService, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getEstudiantes()
  }

  /*listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];*/

  async getEstudiantes() {
  
    await this.estudiantesSerice.obtenerEstudiantes().subscribe((data: any) => {
      console.log('data', data)
      this.estudiantes = data;


      this.total = data.length
      this.totalFooter = `${data.length} Registros encontrados.`;
    }, (error) => {
      console.log('error', error)
    })

  }

  edit(data: any, e?: MouseEvent): void {
    

    if (e) e.preventDefault();

    const modal = this.modal.create({
      nzTitle: `Actualizar Estudiante`,
      nzContent: EditComponent,
      nzComponentParams: data,
      nzWidth: 400,
      nzFooter: null
    });

    modal.afterClose.subscribe(response => {
      // Call a function in the child component
      this.getEstudiantes()
    });
  }

  delete(data: any, e?: MouseEvent): void {
    

    if (e) e.preventDefault();

    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este estudiante?',
      nzContent: '<b style="color: red;">Al eliminar este estudiante, no podrás recuperarlo.</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,

      nzOnOk: () => this.estudiantesSerice.eliminar(data.idEstudiante).subscribe((request: any) => {
        console.log('request: ', request)
        this.getEstudiantes()

        this.notification.create(
          'success',
          'Estudiante eliminado',
          request
        );
      }, (error) => {
        console.log('error', error)
        this.notification.create(
          'error',
          'Error al eliminar estudiante',
          error.message
        );
      }),
      nzOnCancel: () => console.log('Cancel')
    });

  }
}
