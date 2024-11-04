import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../common/utils/utils';
import { Student } from '../../../../core/models/studentModels';
import { dniValidator } from '../../../../common/utils/customValidators';
import { Province } from '../../../../core/models/provinceModels';
import { Observable } from 'rxjs';
import { ProvincesService } from '../../../../core/services/provinces.service';


interface StudentDialogData {
  editingStudent?: Student;
}

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styles: ''
})
export class StudentsFormComponent {

  studentForm: FormGroup;
  provinces$: Observable<Province[]>;

  constructor(
    private provincesService: ProvincesService,
    private matDialogRef: MatDialogRef<StudentsFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: StudentDialogData
  ) {
    this.provinces$ = this.provincesService.getProvinces();

    this.studentForm = this.formBuilder.group({
      firstName: [null, [Validators.minLength(3), Validators.required]],
      lastName: [null, [Validators.minLength(3), Validators.required]],
      email: [null, [Validators.email,Validators.required]],
      dni: [null, [dniValidator,Validators.required]],
      street: [null, [Validators.required]],
      idProvince: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data?.editingStudent;
  }

  patchFormValue() {
    if (this.data?.editingStudent) {
      this.studentForm.patchValue(this.data.editingStudent);
    }
  }

  onSave(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.studentForm.value,
        idStudent: this.isEditing
          ? this.data!.editingStudent!.id
          : generateRandomString(5),
        createdAt: this.isEditing
          ? this.data!.editingStudent!.createdAt
          : new Date(),
      });
    }
  }
}
