import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChairsRoutingModule } from './chairs-routing.module';
import { ShareModule } from '../../../common/share.module';
import { ChairsComponent } from './chairs.component';
import { ChairsFormComponent } from './chairs-form/chairs-form.component';
import { ChairsDetailComponent } from './chairs-detail/chairs-detail.component';
import { AdminModule } from '../admin.module';

@NgModule({
  declarations: [
    ChairsComponent,
    ChairsFormComponent,
    ChairsDetailComponent
  ],
  imports: [
    CommonModule,
    ChairsRoutingModule,
    ShareModule,
    AdminModule
  ]
})
export class ChairsModule { }
