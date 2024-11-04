import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

//importaciones particulares
import { ShareModule } from '../../common/share.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';
import { CommonTableComponent } from './common-table/common-table.component';

@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent,
    InscriptionFormComponent,
    CommonTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ShareModule
  ],
  exports: [
    AdminComponent,
    NavBarComponent,
    InscriptionFormComponent,
    CommonTableComponent
  ]
})
export class AdminModule { }
