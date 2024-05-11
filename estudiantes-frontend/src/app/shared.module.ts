import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HomeComponent } from './pages/home/home.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTypographyModule } from 'ng-zorro-antd/typography';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzFormModule,
    NzNotificationModule,
    NzTypographyModule
  ],
  exports
  : [
    NzTableModule,
    NzDividerModule,
    NzModalModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzFormModule,
    NzNotificationModule,
    NzTypographyModule
  ]
})
export class SharedModule { }
