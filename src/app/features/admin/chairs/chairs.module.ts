import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChairsRoutingModule } from './chairs-routing.module';
import { ShareModule } from '../../../common/share.module';
import { ChairsComponent } from './chairs.component';
import { ChairsFormComponent } from './chairs-form/chairs-form.component';


@NgModule({
  declarations: [
    ChairsComponent,
    ChairsFormComponent
  ],
  imports: [
    CommonModule,
    ChairsRoutingModule,
    ShareModule
  ]
})
export class ChairsModule { }
