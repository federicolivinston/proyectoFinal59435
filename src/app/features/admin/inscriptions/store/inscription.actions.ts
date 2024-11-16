import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription, Option } from '../../../../core/models/inscriptionModels';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': props<{ id: string, tipo: string }>(),
    'Load Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions Failure': props<{ error: boolean }>(),
    'Load FormOptions': props<{ id: string, tipo: string }>(),
    'Load FormOptions Success': props<{ data: Option[] }>(),
    'Load FormOptions Failure': props<{ error: boolean }>(),
    'Create Inscription': props<{data: Inscription}>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: boolean }>(),
    'Delete Inscription': props<{data: string}>(),
    'Delete Inscription Success': props<{ data: Inscription[] }>(),
    'Delete Inscription Failure': props<{ error: boolean }>(),
  }
});
