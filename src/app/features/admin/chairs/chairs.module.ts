import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChairsRoutingModule } from './chairs-routing.module';
import { ShareModule } from '../../../common/share.module';
import { ChairsComponent } from './chairs.component';
import { ChairsFormComponent } from './chairs-form/chairs-form.component';
import { ChairsDetailComponent } from './chairs-detail/chairs-detail.component';
import { AdminModule } from '../admin.module';
import { EffectsModule } from '@ngrx/effects';
import { ChairEffects } from './store/chair.effects';
import { chairFeature } from './store/chair.reducer';
import { StoreModule } from '@ngrx/store';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';

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
    AdminModule,
    InscriptionsModule,
    StoreModule.forFeature(chairFeature),
    EffectsModule.forFeature([ChairEffects])
  ]
})
export class ChairsModule { }
