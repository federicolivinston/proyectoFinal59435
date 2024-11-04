import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { ShareModule } from '../../../common/share.module';
import { AdminModule } from '../admin.module';


@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ShareModule,
    AdminModule
  ]
})
export class UsersModule { }
