import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

//importaciones particulares
import { StudentsModule } from './students/students.module';
import { ShareModule } from '../../common/share.module';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StudentsModule,
    ShareModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
