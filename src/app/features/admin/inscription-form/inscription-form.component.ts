import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { StudentsService } from '../../../core/services/students.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChairsService } from '../../../core/services/chairs.service';


@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styles: ''
})

export class InscriptionFormComponent {
  inscriptionForm: FormGroup;
  data$: Observable<any[]> = of([]);

  constructor(
    private studentsService: StudentsService,
    private chairsService: ChairsService,
    private matDialogRef: MatDialogRef<InscriptionFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public tipo?: string
  ) {
    switch (this.tipo) {
      case 'student':
        this.data$ = this.chairsService.getChairs();
        break;
      case 'chair':
        this.data$ = this.studentsService.getStudents();
        break;  
    }
    this.inscriptionForm = this.formBuilder.group({
      idData: [null, [Validators.required]],
    });
  }

  onSave(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.inscriptionForm.value,
      });
    }
  }
}