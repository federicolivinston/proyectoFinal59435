import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { ShareModule } from '../../../common/share.module';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { AdminModule } from '../admin.module';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/student.effects';
import { studentFeature } from './store/student.reducer';
import { StoreModule } from '@ngrx/store';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    StudentsDetailComponent,
    
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ShareModule,
    AdminModule,
    InscriptionsModule,
    StoreModule.forFeature(studentFeature),
    EffectsModule.forFeature([StudentEffects])
  ],
  exports:[StudentsComponent]
})
export class StudentsModule { }
