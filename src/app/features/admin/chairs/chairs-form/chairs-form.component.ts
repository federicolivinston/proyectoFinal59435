import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../common/utils/utils';
import { Chair } from '../../../../core/models/chairModels';
import { Observable, of } from 'rxjs';
import { Course } from '../../../../core/models/courseModels';
import { Store } from '@ngrx/store';
import { selectChairCourses } from '../store/chair.selectors';
import { ChairActions } from '../store/chair.actions';



interface ChairDialogData {
  editingChair?: Chair;
}

@Component({
  selector: 'app-chairs-form',
  templateUrl: './chairs-form.component.html',
  styles: ''
})
export class ChairsFormComponent {

  chairForm: FormGroup;
  courses$: Observable<Course[]> = of([]);
;

  constructor(
    private store: Store,
    private matDialogRef: MatDialogRef<ChairsFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: ChairDialogData
  ) {
    this.courses$ = this.store.select(selectChairCourses);
    this.store.dispatch(ChairActions.loadChairsCourses());

    this.chairForm = this.formBuilder.group({
      idCourse: [null, [Validators.required]],
      profesor: [null, [Validators.minLength(3), Validators.required]],
      startDate: [null, [Validators.required]],
      vacants: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data?.editingChair;
  }

  patchFormValue() {
    if (this.data?.editingChair) {
      this.chairForm.patchValue(this.data.editingChair);
    }
  }

  onSave(): void {
    if (this.chairForm.invalid) {
      this.chairForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.chairForm.value,
        idChair: this.isEditing
          ? this.data!.editingChair!.id
          : generateRandomString(6),
        createdAt: this.isEditing
          ? this.data!.editingChair!.createdAt
          : new Date(),
      });
    }
  }
}
