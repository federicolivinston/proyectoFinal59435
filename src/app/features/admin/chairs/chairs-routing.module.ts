import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChairsComponent } from './chairs.component';
import { ChairsDetailComponent } from './chairs-detail/chairs-detail.component';

const routes: Routes = [ 
  {
    path: '',
    component: ChairsComponent,
  },
  {
    path: ':id',
    component: ChairsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChairsRoutingModule { }
