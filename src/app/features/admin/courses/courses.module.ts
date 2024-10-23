import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { ShareModule } from '../../../common/share.module';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesFormComponent,
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ShareModule
  ],
  exports:[CoursesComponent]
})
export class CoursesModule { }
