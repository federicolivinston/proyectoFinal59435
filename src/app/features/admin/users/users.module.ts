import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { ShareModule } from '../../../common/share.module';
import { AdminModule } from '../admin.module';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/user.reducer';


@NgModule({
  declarations: [
    UsersComponent,
    UsersFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ShareModule,
    AdminModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UsersModule { }
