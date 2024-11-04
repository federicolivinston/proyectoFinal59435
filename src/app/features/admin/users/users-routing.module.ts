import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { authAdminGuard } from '../../../core/guards/auth-admin-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authAdminGuard],
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
