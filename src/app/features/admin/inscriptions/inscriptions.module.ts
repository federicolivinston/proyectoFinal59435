import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { ShareModule } from '../../../common/share.module';
import { InscriptionsComponent } from './inscriptions.component';
import { AdminModule } from '../admin.module';
import { StoreModule } from '@ngrx/store';
import { inscriptionFeature } from './store/inscription.reducer';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';

@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionFormComponent,
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    ShareModule,
    AdminModule,
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([InscriptionEffects]),
  ],
  exports: [
    InscriptionsComponent,
    InscriptionFormComponent,
  ]
})
export class InscriptionsModule { }
