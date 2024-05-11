import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddComponent } from 'src/app/components/add/add.component';
import { TablaComponent } from 'src/app/components/tabla/tabla.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  @ViewChild(TablaComponent) tabla!: TablaComponent;

  constructor(private modal: NzModalService) { }


  ngOnInit(): void {
  }


  add = (e?: MouseEvent) => {
    if (e) e.preventDefault();

    const modal = this.modal.create({
      nzTitle: `Agregar Estudiante`,
      nzContent: AddComponent,
      nzWidth: 400,
      nzFooter: null
    });

    modal.afterClose.subscribe(response => {
      // Call a function in the child component
      this.tabla.getEstudiantes()
    });
  }

}
