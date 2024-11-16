import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/userModels';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersFormComponent } from './users-form/users-form.component';
import { UserFullNamePipe } from '../../../common/pipes/user-full-name.pipe';
import { Store } from '@ngrx/store';
import { selectIsLoadingUsers, selectLoadUsersError, selectUsers } from './store/user.selectors';
import { UserActions } from './store/user.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users$: Observable<User[]> = of([]);
  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'fullName', header: 'Nombre', cell: (row: any) => row, pipe: new UserFullNamePipe(), },
    { columnDef: 'userName', header: 'Email', cell: (row: any) => row.userName },
    { columnDef: 'profile', header: 'DNI', cell: (row: any) => row.profile },
  ];
  actionFunctions = [
    { label: 'edit', function: (user: User) => this.openForm(user)},
    { label: 'delete', function: (user: any) => this.onDelete(user.id)} 
  ];

  loadUsersError$: Observable<boolean>;
  isLoadingUsers$: Observable<boolean>;

  constructor(
      private store: Store,
      private dialog: MatDialog,
      private router: Router
    ){
      this.users$ = this.store.select(selectUsers);
      this.isLoadingUsers$ = this.store.select(selectIsLoadingUsers);
      this.loadUsersError$ = this.store.select(selectLoadUsersError);
    }

    ngOnInit(): void {
      this.loadUsers();
    }

    loadUsers():void{
      this.store.dispatch(UserActions.loadUsers());
    }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.store.dispatch(UserActions.deleteUser({data: id}));
    }
  }

  openForm(editingUser?: User): void {
    this.dialog
      .open(UsersFormComponent, {
        data: {
          editingUser,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingUser) {
              this.store.dispatch(UserActions.updateUser({id: editingUser.id, data: result}));
            } else {
              this.store.dispatch(UserActions.createUser({data: result}));
            }
          }
        }
      });
  }
}
