import { Component, Inject } from '@angular/core';
import { Course, Degree } from '../../../../core/models/courseModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../common/utils/utils';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectDegrees } from '../store/course.selectors';
import { CourseActions } from '../store/course.actions';

interface CourseDialogData {
  editingCourse?: Course;
}

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styles: ''
})
export class CoursesFormComponent {

  courseForm: FormGroup;
  degrees$: Observable<Degree[]> = of([]);

  constructor(
    private store: Store,
    private matDialogRef: MatDialogRef<CoursesFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: CourseDialogData
  ) {
    this.degrees$ = this.store.select(selectDegrees);
    this.store.dispatch(CourseActions.loadDegrees());

    this.courseForm = this.formBuilder.group({
      title: [null, [Validators.minLength(3), Validators.required]],
      degree: [null, [Validators.minLength(3), Validators.required]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data?.editingCourse;
  }

  patchFormValue() {
    if (this.data?.editingCourse) {
      this.courseForm.patchValue(this.data.editingCourse);
    }
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.courseForm.value,
        idStudent: this.isEditing
          ? this.data!.editingCourse!.id
          : generateRandomString(5),
        createdAt: this.isEditing
          ? this.data!.editingCourse!.createdAt
          : new Date(),
      });
    }
  }
}
