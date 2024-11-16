import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { selectFormOptions } from '../store/inscription.selectors';
import { InscriptionActions } from '../store/inscription.actions';
import { Option } from '../../../../core/models/inscriptionModels';

interface InscriptionDialogData {
  id: string,
  inscriptionType: string;
}

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styles: ''
})

export class InscriptionFormComponent {
  inscriptionForm: FormGroup;
  options$: Observable<Option[]> = of([]);
  id: string ='';
  tipo: string =''

  constructor(
    private store: Store,
    private matDialogRef: MatDialogRef<InscriptionFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: InscriptionDialogData
  ) {
    this.id=data?.id?data?.id:'';
    this.tipo = data?.inscriptionType?data?.inscriptionType:'';

    this.store.dispatch(InscriptionActions.loadFormOptions({ id: this.id, tipo: this.tipo }));
    this.options$ = this.store.pipe(select(selectFormOptions));

    this.inscriptionForm = this.formBuilder.group({
      idData: [null, [Validators.required]],
    });
  }

  onSave(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      if(this.tipo=='chair'){
        this.matDialogRef.close({
          idChair: this.id,
          idStudent: this.inscriptionForm.value.idData
        });
      }else{
        this.matDialogRef.close({
          idStudent: this.id,
          idChair: this.inscriptionForm.value.idData
        });
      }
      
    }
  }
}

