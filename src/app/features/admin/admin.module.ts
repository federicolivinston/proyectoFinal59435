import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

//importaciones particulares
import { ShareModule } from '../../common/share.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ShareModule
  ],
  exports: [
    AdminComponent,
    NavBarComponent
  ]
})
export class AdminModule { }
