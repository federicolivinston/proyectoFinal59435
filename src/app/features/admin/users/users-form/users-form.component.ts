import { Component, Inject, OnInit } from '@angular/core';
import { Profile, User } from '../../../../core/models/userModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../common/utils/utils';
import { Observable, of } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service';
import { passwordValidator, usernameValidator } from '../../../../common/utils/customValidators';
import { Store } from '@ngrx/store';
import { selectProfiles } from '../store/user.selectors';
import { UserActions } from '../store/user.actions';

interface UserDialogData {
  editingUser?: User;
}

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styles: ''
})
export class UsersFormComponent{

  userForm: FormGroup;
  profiles$: Observable<Profile[]> = of([]);

  constructor(
    private store: Store,
    private matDialogRef: MatDialogRef<UsersFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData,
  ) {
    this.profiles$ = this.store.select(selectProfiles);
    this.store.dispatch(UserActions.loadProfiles());

    this.userForm = this.formBuilder.group({
      userName: [null, [usernameValidator(), Validators.required]],
      firstName: [null, [Validators.minLength(3), Validators.required]],
      lastName: [null, [Validators.minLength(3), Validators.required]],
      password: [null, [Validators.required,passwordValidator()]],
      profile: [null, [Validators.required]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data?.editingUser;
  }

  patchFormValue() {
    if (this.data?.editingUser) {
      this.userForm.patchValue(this.data.editingUser);
    }
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.userForm.value,
        idStudent: this.isEditing
          ? this.data!.editingUser!.id
          : generateRandomString(5),
        createdAt: this.isEditing
          ? this.data!.editingUser!.createdAt
          : new Date(),
      });
    }
  }
}
