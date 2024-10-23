import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { ShareModule } from '../../../common/share.module';
import { StudentsDetailComponent } from './students-detail/students-detail.component';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    StudentsDetailComponent,
    
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ShareModule
  ],
  exports:[StudentsComponent]
})
export class StudentsModule { }
